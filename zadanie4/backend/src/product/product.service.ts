import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    private products: Map<number, Product> = new Map();

    constructor() {
        const p = new Product('Bottle of water', 'Necessary to survive', 1, 1);
        p.id = 1;
        this.products.set(1, p);
    }

    create(createProductDto: CreateProductDto): Product {
        console.log(createProductDto);
        const id = 1 + this.products.size;
        const p: Product = createProductDto.mapToProduct();
        p.id = id;
        this.products.set(id, p);
        return p;
    }

    findAll(): Product[] {
        return Array.from(this.products.values());
    }

    findOne(id: number): Product {
        const p = this.products.get(id);

        if (undefined === p) {
            throw new NotFoundException();
        }
        return p;
    }

    update(id: number, updateProductDto: UpdateProductDto): Product {
        const p: Product = this.products.get(id);

        if (undefined === p) {
            throw new NotFoundException();
        }

        p.name = updateProductDto.name ?? p.name;
        p.description = updateProductDto.description ?? p.description;
        p.unitPrice = updateProductDto.unitPrice ?? p.unitPrice;
        p.unitWeight = updateProductDto.unitWeight ?? p.unitWeight;

        this.products.set(id, p);
        return p;
    }

    remove(id: number): void {
        if (false === this.products.delete(id)) {
            throw new NotFoundException();
        }
    }
}
