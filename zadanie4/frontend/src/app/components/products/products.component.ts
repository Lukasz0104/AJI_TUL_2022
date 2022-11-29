import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Filters } from '../products-filter/products-filter.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.get().subscribe((v) => (this.products = v));
    }

    filterProducts(filters: Filters) {
        // TODO add filtering logic
    }
}
