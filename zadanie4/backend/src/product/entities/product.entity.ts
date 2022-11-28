import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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

    @ManyToOne(() => Category, {
        eager: true
    })
    category: Category;

    constructor(
        name: string,
        description: string,
        unitPrice: number,
        unitWeight: number,
        category: Category
    ) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitWeight = unitWeight;
        this.category = category;
    }
}
