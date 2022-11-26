import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStrippedPassword } from '../auth/auth.service';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { CreateOrderDto } from './dto/create-order.dto';
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

    getAllPossibleStatuses(): OrderStatus[] {
        return this.statuses;
    }

    async create(
        user: UserStrippedPassword,
        createOrderDto: CreateOrderDto
    ): Promise<Order> {
        const order: Order = await this.mapDtoToOrder(createOrderDto);

        order.emailAddress = user.emailAddress;
        order.phoneNumber = user.phoneNumber;
        order.username = user.username;

        return await this.orderRepo.save(order);
    }

    async findAll(status?: OrderStatus): Promise<Order[]> {
        if (status) {
            return await this.orderRepo.findBy({ status: status });
        } else {
            return await this.orderRepo.find();
        }
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepo.findOneBy({ id: id });

        if (!order) {
            throw new NotFoundException();
        }

        return order;
    }

    private async mapDtoToOrder(dto: CreateOrderDto): Promise<Order> {
        const order = new Order();
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

        return order;
    }

    private async mapDtoToOrderDetails(
        dto: CreateOrderDetailsDto
    ): Promise<OrderDetails> {
        const product = await this.productRepo.findOneBy({ id: dto.productId });

        if (!product) {
            throw new NotFoundException(
                `Product with id=${dto.productId} does not exist!`
            );
        }

        const orderDetails = new OrderDetails();
        orderDetails.quantity = dto.quantity;
        orderDetails.product = product;
        return orderDetails;
    }

    private compareStatus(s1: OrderStatus, s2: OrderStatus): number {
        const index1 = this.statuses.indexOf(s1);
        const index2 = this.statuses.indexOf(s2);
        return index1 - index2;
    }

    async changeOrderStatus(id: number, status: OrderStatus): Promise<Order> {
        const order = await this.orderRepo.findOneBy({ id: id });

        if (!order) {
            throw new NotFoundException(`Order with id=${id} does not exist!`);
        }

        if (order.status == OrderStatus.CANCELLED) {
            throw new BadRequestException(
                'Cannot change status of a cancelled order!'
            );
        }

        if (
            order.status === OrderStatus.COMPLETED &&
            status === OrderStatus.CANCELLED
        ) {
            throw new BadRequestException('Cannot cancel a completed order');
        }

        if (this.compareStatus(order.status, status) > 0) {
            throw new BadRequestException('Cannot change status backwards!');
        }

        order.status = status;
        await this.orderRepo.update({ id: id }, order);
        return order;
    }
}
