import { Optional } from '@nestjs/common';
import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPhoneNumber,
    IsString,
    MinLength
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../order-status.enum';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Optional()
    @IsDateString()
    @Column()
    acceptDate: Date;

    @Column()
    status: OrderStatus;

    @IsString()
    @Column()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @Column()
    emailAddress: string;

    @IsPhoneNumber('PL')
    @Column()
    phoneNumber: string;

    @MinLength(1, { each: true })
    @OneToMany(() => OrderDetails, products => products.order, {
        cascade: true
    })
    products: OrderDetails[];
}
