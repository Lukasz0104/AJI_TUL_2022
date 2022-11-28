import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService as ProductService } from '../../services/products.service';

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
}
