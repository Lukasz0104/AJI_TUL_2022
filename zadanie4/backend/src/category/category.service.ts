import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    private readonly categories: Category[] = [
        new Category(1, 'food and drinks'),
        new Category(2, 'books'),
        new Category(3, 'sports')
    ];

    findAll(): Category[] {
        return this.categories;
    }
}
