import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetails } from './entities/order-details.entity';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrderService {
    private readonly statuses = [
        OrderStatus.UNAPPROVED,
        OrderStatus.APPROVED,
        OrderStatus.COMPLETED,
        OrderStatus.CANCELLED
    ];

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

        order.emailAddress = dto.emailAddress;
        order.phoneNumber = dto.phoneNumber;
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
        const product = await this.productRepo.findOneBy({ id: dto.productId });

        if (product === null) {
            throw new NotFoundException(
                `Product with id=${dto.productId} does not exist!`
            );
        }

        const orderDetails = new OrderDetails();
        orderDetails.quantity = dto.quantity;
        orderDetails.product = product;
        return orderDetails;
    }

    // private compareStatus(s1: OrderStatus, s2: OrderStatus): number {
    //     const index1 = this.statuses.indexOf(s1);
    //     const index2 = this.statuses.indexOf(s2);
    //     return index1 - index2;
    // }
}
