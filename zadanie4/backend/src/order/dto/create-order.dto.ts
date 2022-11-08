import {
    ArrayMinSize,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString
} from 'class-validator';
import { CreateOrderDetailsDto } from './create-order-details.dto';

export class CreateOrderDto {
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
