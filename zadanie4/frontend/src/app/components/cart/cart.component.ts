import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent {
    constructor(
        protected cartService: CartService,
        protected productService: ProductService
    ) {}

    increment(id: number, p: Product) {
        this.cartService.addProduct(id, p);
    }

    decrement(id: number) {
        this.cartService.takeAwayOne(id);
    }

    remove(id: number) {
        this.cartService.remove(id);
    }

    createOrder() {
        this.cartService.placeOrder();
    }
}
