import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    findAll(): Category[] {
        return [];
    }
}
