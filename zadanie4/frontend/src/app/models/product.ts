import { Category } from './category';

export interface Product {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    unitWeight: number;
    category: Category;
}
