import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderDetails } from './entities/order-details.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Product, Category, OrderDetails])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
