import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class Product {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsPositive()
    @IsNumber()
    unitPrice: number;

    @IsPositive()
    @IsNumber()
    unitWeight: number;

    constructor(
        name: string,
        description: string,
        unitPrice: number,
        unitWeight: number
    ) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitWeight = unitWeight;
    }
}
