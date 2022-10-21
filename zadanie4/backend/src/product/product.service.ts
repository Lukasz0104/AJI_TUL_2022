import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    create(createProductDto: CreateProductDto): Product {
        return null;
    }

    findAll(): Product[] {
        return [];
    }

    findOne(id: number): Product {
        return null;
    }

    update(id: number, updateProductDto: UpdateProductDto): Product {
        return null;
    }

    remove(id: number): void {
        throw new NotImplementedException();
    }
}
