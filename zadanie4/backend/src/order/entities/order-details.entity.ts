import { IsNumber } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
