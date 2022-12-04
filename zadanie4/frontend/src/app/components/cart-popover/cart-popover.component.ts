import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart-popover',
    templateUrl: './cart-popover.component.html'
})
export class CartPopoverComponent {
    constructor(protected cartService: CartService) {}

    increment(id: number, p: Product) {
        this.cartService.addProduct(id, p);
    }

    decrement(id: number) {
        this.cartService.takeAwayOne(id);
    }
}
