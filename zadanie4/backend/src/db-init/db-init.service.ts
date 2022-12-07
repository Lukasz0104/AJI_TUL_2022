import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/role.enum';

@Injectable()
export class DbInitService implements OnApplicationBootstrap {
    private readonly logger = new Logger(DbInitService.name);

    constructor(
        private configService: ConfigService,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async onApplicationBootstrap() {
        this.logger.debug('Seeding database with data');

        this.logger.debug('Seeding categories...');
        const categories = await this.seedCategories();

        this.logger.debug('Seeding products...');
        await this.seedProducts(categories);

        this.logger.debug('Seeding accounts...');
        await this.seedAccounts();
    }

    private async seedCategories() {
        return await this.categoryRepo.save([
            new Category('Food and drinks'),
            new Category('Books'),
            new Category('Sport equipment'),
            new Category('Furniture'),
            new Category('Clothing'),
            new Category('Toys')
        ]);
    }

    private async seedProducts(categories: Category[]) {
        return await this.productRepo.insert([
            new Product(
                'Bottle of water',
                '500 ml, sparkling',
                1,
                0.5,
                categories[0]
            ),
            new Product(
                'Wooden chair',
                'Very comfortable',
                57.34,
                3.2,
                categories[3]
            ),
            new Product(
                "Rubik's cube",
                'Try to solve the best-selling toy yourself!',
                37.99,
                0.201,
                categories[5]
            )
        ]);
    }

    private async seedAccounts() {
        this.logger.debug('Adding admin account to the database');
        const salt = await genSalt(10);
        const admin = new User();
        admin.username = this.configService.get('ADMIN_USERNAME');
        admin.password = await hash(
            this.configService.get('ADMIN_PASSWORD'),
            salt
        );
        admin.emailAddress = this.configService.get('ADMIN_EMAIL');
        admin.phoneNumber = this.configService.get('ADMIN_PHONE_NUMBER');
        admin.role = Role.ADMIN;

        await this.userRepo.save(admin);

        this.logger.debug('Adding client account to the database');
        const client = new User();
        client.username = this.configService.get('CLIENT_USERNAME');
        client.password = await hash(
            this.configService.get('CLIENT_PASSWORD'),
            salt
        );
        client.phoneNumber = this.configService.get('CLIENT_PHONE_NUMBER');
        client.emailAddress = this.configService.get('CLIENT_EMAIL');

        await this.userRepo.save(client);
    }
}
