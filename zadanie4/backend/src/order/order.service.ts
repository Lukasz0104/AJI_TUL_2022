import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetails } from './entities/order-details.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Product) private productRepo: Repository<Product>
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const order: Order = await this.mapDtoToOrder(createOrderDto);
        return await this.orderRepo.save(order);
    }

    async findAll(): Promise<Order[]> {
        return await this.orderRepo.find();
    }

    async findOne(id: number): Promise<Order> {
        const order = this.orderRepo.findOneBy({ id: id });

        if (undefined === order) {
            throw new NotFoundException();
        }

        return order;
    }

    async update(id: number, dto: UpdateOrderDto): Promise<Order> {
        const order: Order = await this.orderRepo.findOneBy({ id: id });

        if (undefined === order) {
            throw new NotFoundException();
        }

        order.acceptDate = dto.acceptDate ?? order.acceptDate;
        order.status = dto.status ?? order.status;
        order.username = dto.username ?? order.username;
        order.emailAddress = dto.emailAddress ?? order.emailAddress;
        order.phoneNumber = dto.phoneNumber ?? order.phoneNumber;

        return await this.orderRepo.save(order);
    }

    async remove(id: number) {
        await this.orderRepo.delete({ id: id });
    }

    private async mapDtoToOrder(dto: CreateOrderDto): Promise<Order> {
        const order = new Order();

        order.acceptDate = dto.acceptDate;
        order.emailAddress = dto.emailAddress;
        order.phoneNumber = dto.phoneNumber;
        order.status = dto.status;
        order.username = dto.username;

        order.products = await Promise.all(
            Array.from(
                dto.products
                    .reduce((map, dto) => {
                        // group by productId and sum quantities
                        if (map.has(dto.productId)) {
                            map.get(dto.productId).quantity += dto.quantity;
                        } else {
                            map.set(dto.productId, dto);
                        }
                        return map;
                    }, new Map<number, CreateOrderDetailsDto>())
                    .values(),
                async p => await this.mapDtoToOrderDetails(p)
            )
        );

        return await this.orderRepo.save(order);
    }

    private async mapDtoToOrderDetails(
        dto: CreateOrderDetailsDto
    ): Promise<OrderDetails> {
        const product = await this.productRepo.findOneBy({ id: dto.productId }); // TODO check if product is not null
        const orderDetails = new OrderDetails();
        orderDetails.quantity = dto.quantity;
        orderDetails.product = product;
        return orderDetails;
    }
}
