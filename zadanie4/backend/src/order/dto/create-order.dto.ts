import { Optional } from '@nestjs/common';
import {
    ArrayMinSize,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString
} from 'class-validator';
import { OrderDetails } from '../entities/order-details.entity';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
    @Optional()
    @IsDateString()
    acceptDate: Date;

    status: OrderStatus;

    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsPhoneNumber('PL')
    phoneNumber: string;

    @ArrayMinSize(1)
    products: OrderDetails[];

    mapToOrder(): Order {
        const order: Order = new Order();

        order.acceptDate = this.acceptDate;
        order.status = this.status;
        order.username = this.username;
        order.emailAddress = this.emailAddress;
        order.phoneNumber = this.phoneNumber;
        order.products = this.products;

        return order;
    }
}
