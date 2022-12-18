import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent {
    protected orders$ = new BehaviorSubject<Order[]>([]);

    constructor(private readonly orderService: OrderService) {
        this.orderService.getOrders().subscribe((orders) => {
            this.orders$.next(orders);
        });
    }

    onApprove(orderId: number) {
        this.orderService.approveOrder(orderId).subscribe(this.replaceUpdated);
    }

    onComplete(orderId: number) {
        this.orderService.completeOrder(orderId).subscribe(this.replaceUpdated);
    }

    onCancel(orderId: number) {
        this.orderService.cancelOrder(orderId).subscribe(this.replaceUpdated);
    }

    private replaceUpdated = (updated: Order) => {
        this.orders$.next(
            this.orders$.getValue().map((order) => {
                if (order.id === updated.id) {
                    return updated;
                }
                return order;
            })
        );
    };

    protected canApprove(order: Order): boolean {
        switch (order.status) {
            case 'UNAPPROVED':
                return true;
            default:
                return false;
        }
    }

    protected canComplete(order: Order): boolean {
        switch (order.status) {
            case 'UNAPPROVED':
            case 'APPROVED':
                return true;
            default:
                return false;
        }
    }

    protected canCancel(order: Order): boolean {
        switch (order.status) {
            case 'COMPLETED':
            case 'CANCELLED':
                return false;
            default:
                return true;
        }
    }
}
