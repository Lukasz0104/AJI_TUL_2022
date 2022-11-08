import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailsDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
