import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const p: Product = await this.mapDtoToProduct(createProductDto);
        return await this.productRepo.save(p);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepo.find();
    }

    async findOne(id: number): Promise<Product> {
        const p = await this.productRepo.findOneBy({ id: id });

        if (!p) {
            throw new NotFoundException();
        }
        return p;
    }

    async update(
        id: number,
        updateProductDto: UpdateProductDto
    ): Promise<Product> {
        const p = await this.productRepo.findOneBy({ id: id });

        if (!p) {
            throw new NotFoundException();
        }

        p.name = updateProductDto.name ?? p.name;
        p.description = updateProductDto.description ?? p.description;
        p.unitPrice = updateProductDto.unitPrice ?? p.unitPrice;
        p.unitWeight = updateProductDto.unitWeight ?? p.unitWeight;

        if (updateProductDto.categoryId) {
            p.category =
                (await this.categoryRepo.findOneBy({
                    id: updateProductDto.categoryId
                })) ?? p.category;
        }

        return this.productRepo.save(p);
    }

    private async mapDtoToProduct(dto: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepo.findOneBy({
            id: dto.categoryId
        });

        if (!category) {
            throw new NotFoundException(
                `Category with id=${dto.categoryId} does not exist!`
            );
        }

        return new Product(
            dto.name,
            dto.description,
            dto.unitPrice,
            dto.unitWeight,
            category
        );
    }
}
