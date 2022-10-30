import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @IsOptional()
    @IsNumber()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsPositive()
    @IsNumber()
    unitPrice: number;

    @Column()
    @IsPositive()
    @IsNumber()
    unitWeight: number;

    constructor(
        name: string,
        description: string,
        unitPrice: number,
        unitWeight: number
    ) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitWeight = unitWeight;
    }
}
