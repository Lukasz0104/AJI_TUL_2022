import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly repo: Repository<Category>
    ) {
        this.repo.insert([
            new Category('food and drinks'),
            new Category('books'),
            new Category('sport equipment'),
            new Category('furniture'),
            new Category('clothing'),
            new Category('toys')
        ]);
    }

    async findAll(): Promise<Category[]> {
        return await this.repo.find();
    }
}
