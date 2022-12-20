import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [RoleGuard],
        data: {
            allowedRoles: ['USER', null]
        }
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [RoleGuard],
        data: {
            allowedRoles: ['ADMIN']
        }
    },
    { path: '**', redirectTo: '/products' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
