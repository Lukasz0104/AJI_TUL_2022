import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {
        const p = new Product('Bottle of water', 'Necessary to survive', 1, 1);
        repo.save(p);
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const p: Product = createProductDto.mapToProduct();
        return await this.repo.save(p);
    }

    async findAll(): Promise<Product[]> {
        return await this.repo.find();
    }

    async findOne(id: number): Promise<Product> {
        const p = await this.repo.findOneBy({ id: id });

        if (null === p) {
            throw new NotFoundException();
        }
        return p;
    }

    async update(
        id: number,
        updateProductDto: UpdateProductDto
    ): Promise<Product> {
        const p = await this.repo.findOneBy({ id: id });

        if (undefined === p) {
            throw new NotFoundException();
        }

        p.name = updateProductDto.name ?? p.name;
        p.description = updateProductDto.description ?? p.description;
        p.unitPrice = updateProductDto.unitPrice ?? p.unitPrice;
        p.unitWeight = updateProductDto.unitWeight ?? p.unitWeight;

        return this.repo.save(p);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete({ id: id });
    }
}
