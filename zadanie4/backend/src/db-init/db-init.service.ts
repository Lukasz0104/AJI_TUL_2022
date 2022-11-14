import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/role.enum';

@Injectable()
export class DbInitService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(User) private userRepo: Repository<User>
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

        console.log('Adding admin account to the database');
        const salt = await genSalt(10);
        const admin = new User();
        admin.username = process.env.ADMIN_USERNAME;
        admin.password = await hash(process.env.ADMIN_PASSWORD, salt);
        admin.emailAddress = process.env.ADMIN_EMAIL;
        admin.phoneNumber = '000000000';
        admin.role = Role.ADMIN;

        await this.userRepo.save(admin);
    }
}
