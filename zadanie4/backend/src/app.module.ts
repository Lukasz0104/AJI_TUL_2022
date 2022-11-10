import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { DbInitModule } from './db-init/db-init.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'productsdb.sqlite',
            synchronize: true,
            entities: ['**/*.entity.js'],
            dropSchema: true
        }),
        ProductModule,
        CategoryModule,
        OrderModule,
        DbInitModule
    ]
})
export class AppModule {}
