import { Optional } from '@nestjs/common';
import {
    ArrayMinSize,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString
} from 'class-validator';
import { OrderStatus } from '../order-status.enum';
import { CreateOrderDetailsDto } from './create-order-details.dto';

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
    products: CreateOrderDetailsDto[];
}
