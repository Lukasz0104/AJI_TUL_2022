import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

export interface ProductWithQuantity {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly _cart: Map<number, ProductWithQuantity> = new Map();

    constructor(private httpClient: HttpClient) {}

    get count(): number {
        let count = 0;
        this._cart.forEach((pwq) => (count += pwq.quantity));
        return count;
    }

    get cart(): Map<number, ProductWithQuantity> {
        return this._cart;
    }

    get totalCost(): number {
        let sum = 0;

        this.cart.forEach((pwq: ProductWithQuantity) => {
            sum += pwq.quantity * pwq.product.unitPrice;
        });

        return sum;
    }

    addProduct(id: number, p: Product) {
        const pwq: ProductWithQuantity | undefined = this._cart.get(id);

        if (pwq) {
            pwq.quantity++;
            this._cart.set(id, pwq);
        } else {
            this._cart.set(id, { product: p, quantity: 1 });
        }
    }

    takeAwayOne(id: number) {
        const pwq = this._cart.get(id);
        if (pwq && pwq.quantity > 1) {
            pwq.quantity--;
            this._cart.set(id, pwq);
        } else if (pwq && pwq.quantity == 1) {
            this._cart.delete(id);
        }
    }

    remove(id: number) {
        this._cart.delete(id);
    }

    placeOrder(): Observable<boolean> {
        return of(false);
        // TODO send http request
        // TODO clear cart
    }
}
