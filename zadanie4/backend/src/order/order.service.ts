import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    private orders: Map<number, Order> = new Map();

    create(createOrderDto: CreateOrderDto): Order {
        const order: Order = createOrderDto.mapToOrder();
        const id = Math.max(0, ...this.orders.keys()) + 1;
        order.id = id;
        this.orders.set(id, order);

        return order;
    }

    findAll(): Order[] {
        return Array.from(this.orders.values());
    }

    findOne(id: number): Order {
        const order = this.orders.get(id);

        if (undefined === order) {
            throw new NotFoundException();
        }

        return order;
    }

    update(id: number, dto: UpdateOrderDto): Order {
        const order: Order = this.orders.get(id);

        if (undefined === order) {
            throw new NotFoundException();
        }

        order.acceptDate = dto.acceptDate ?? order.acceptDate;
        order.status = dto.status ?? order.status;
        order.username = dto.username ?? order.username;
        order.emailAddress = dto.emailAddress ?? order.emailAddress;
        order.phoneNumber = dto.phoneNumber ?? order.phoneNumber;
        order.products = dto.products ?? order.products;

        this.orders.set(id, order);

        return order;
    }

    remove(id: number) {
        this.orders.delete(id);
    }
}
