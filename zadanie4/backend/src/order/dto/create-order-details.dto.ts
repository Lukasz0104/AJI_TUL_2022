import { IsNumber } from 'class-validator';

export class CreateOrderDetailsDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}
