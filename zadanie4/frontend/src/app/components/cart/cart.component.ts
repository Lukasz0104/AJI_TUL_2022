import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent {
    constructor(
        protected cartService: CartService,
        protected productService: ProductService,
        protected authService: AuthService,
        protected router: Router
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
        if (this.authService.authenticated) {
            this.cartService.placeOrder().subscribe((r) => {
                console.log(r);
                this.router.navigate(['products']);
                // TODO show toast message
            });
        }
    }

    protected get tooltipMessage(): string | null {
        return !this.authService.authenticated
            ? 'You have to login first.'
            : null;
    }
}
