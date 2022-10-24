import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

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

    mapToProduct(): Product {
        return new Product(
            this.name,
            this.description,
            this.unitPrice,
            this.unitWeight
        );
    }
}
