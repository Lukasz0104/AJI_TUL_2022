import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
    constructor(protected router: Router, protected cartService: CartService) {}
}
