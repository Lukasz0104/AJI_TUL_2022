import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly cart: Map<number, number> = new Map();

    addProduct(id: number) {
        const count: number | undefined = this.cart.get(id);

        if (count) {
            this.cart.set(id, count + 1);
        } else {
            this.cart.set(id, 1);
        }
    }

    get count(): number {
        let count = 0;
        this.cart.forEach((v) => (count += v));
        return count;
    }
}
