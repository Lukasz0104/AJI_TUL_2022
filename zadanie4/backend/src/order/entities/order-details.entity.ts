import { IsNumber } from 'class-validator';

export class OrderDetails {
    @IsNumber()
    orderId: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}
