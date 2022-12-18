import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private readonly ORDERS_URL = `${environment.apiUrl}/orders`;

    constructor(private readonly httpClient: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(this.ORDERS_URL);
    }

    approveOrder(id: number) {
        return this.httpClient.put<Order>(
            `${this.ORDERS_URL}/${id}/approve`,
            null
        );
    }

    completeOrder(id: number) {
        return this.httpClient.put<Order>(
            `${this.ORDERS_URL}/${id}/complete`,
            null
        );
    }

    cancelOrder(id: number) {
        return this.httpClient.put<Order>(
            `${this.ORDERS_URL}/${id}/cancel`,
            null
        );
    }
}
