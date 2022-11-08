import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    ValidateNested
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

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => CreateOrderDetailsDto)
    products: CreateOrderDetailsDto[];
}
