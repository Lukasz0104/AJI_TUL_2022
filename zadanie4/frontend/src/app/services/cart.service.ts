import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { Product } from '../models/product';

export type ProductWithQuantity = Product & { quantity: number };
export interface CreateOrderDetails {
    productId: number;
    quantity: number;
}

export interface CreateOrder {
    products: CreateOrderDetails[];
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly _cart: Map<number, ProductWithQuantity> = new Map();
    private readonly ORDERS_URL = `${environment.apiUrl}/orders`;

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
            sum += pwq.quantity * pwq.unitPrice;
        });

        return sum;
    }

    addProduct(id: number, p: Product) {
        const pwq: ProductWithQuantity | undefined = this._cart.get(id);

        if (pwq) {
            pwq.quantity++;
            this._cart.set(id, pwq);
        } else {
            this._cart.set(id, Object.assign(p, { quantity: 1 }));
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

    placeOrder(): Observable<unknown> {
        const body: CreateOrder = { products: [] };

        this.cart.forEach((pwq: ProductWithQuantity) => {
            body.products.push({
                quantity: pwq.quantity,
                productId: pwq.id
            });
        });

        this.cart.clear();

        return this.httpClient.post<Order>(this.ORDERS_URL, body);
    }
}
