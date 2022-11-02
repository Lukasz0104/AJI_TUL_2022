import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DbInitService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>
    ) {}

    async onApplicationBootstrap() {
        console.log('Seeding Database with data');

        console.log('Seeding categories...');

        const categories = [
            new Category('Food and drinks'),
            new Category('Books'),
            new Category('Sport equipment'),
            new Category('Furniture'),
            new Category('Clothing'),
            new Category('Toys')
        ];

        await this.categoryRepo.save(categories);

        console.log('Seeding products...');
        const products = [
            new Product(
                'Bottle of water',
                '500 ml, sparkling',
                1,
                0.5,
                categories[0]
            )
        ];

        await this.productRepo.insert(products);
    }
}
