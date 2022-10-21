import { Product } from '../entities/product.entity';

export class CreateProductDto {
    name: string;

    description: string;

    unitPrice: number;

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
