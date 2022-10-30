import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        ProductModule,
        CategoryModule,
        OrderModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'productsdb.sqlite',
            synchronize: true,
            entities: ['**/*.entity.js'],
            dropSchema: true
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
