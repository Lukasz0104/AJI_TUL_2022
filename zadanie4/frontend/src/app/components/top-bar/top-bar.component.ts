import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
    protected isCollapsed = true;

    constructor(
        protected router: Router,
        protected cartService: CartService,
        protected readonly authService: AuthService
    ) {}

    onLogout(): void {
        this.authService.logout();
    }
}
