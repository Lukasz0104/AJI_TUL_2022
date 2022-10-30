import { Optional } from '@nestjs/common';
import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPhoneNumber,
    IsString,
    MinLength
} from 'class-validator';
import { OrderStatus } from '../order-status.enum';
import { OrderDetails } from './order-details.entity';

export class Order {
    @IsNumber()
    id: number;

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

    @MinLength(1, {
        each: true
    })
    products: OrderDetails[];
}
