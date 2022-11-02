import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    unitPrice: number;

    @IsNumber()
    @IsPositive()
    unitWeight: number;

    @IsNumber()
    categoryId: number;

    constructor(
        name: string,
        description: string,
        unitPrice: number,
        unitWeight: number,
        categoryId: number
    ) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitWeight = unitWeight;
        this.categoryId = categoryId;
    }
}
