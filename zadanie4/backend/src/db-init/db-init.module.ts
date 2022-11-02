import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { OrderDetails } from 'src/order/entities/order-details.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { DbInitService } from './db-init.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product, Order, OrderDetails])
    ],
    providers: [DbInitService]
})
export class DbInitModule {}
