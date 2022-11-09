import { IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.products, {
        onDelete: 'CASCADE'
    })
    order: Order;

    @ManyToOne(() => Product) // TODO add NOT NULL constraint
    product: Product;

    @IsNumber()
    @Column()
    quantity: number;
}
