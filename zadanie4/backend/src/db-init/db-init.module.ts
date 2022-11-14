import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { OrderDetails } from '../order/entities/order-details.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { DbInitService } from './db-init.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product, Order, OrderDetails, User])
    ],
    providers: [DbInitService]
})
export class DbInitModule {}
