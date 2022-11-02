import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @ManyToOne(() => Category)
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
