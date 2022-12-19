import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartPopoverComponent } from './components/cart-popover/cart-popover.component';
import { CartComponent } from './components/cart/cart.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductsComponent,
        ProductsFilterComponent,
        CartComponent,
        CartPopoverComponent,
        RegisterComponent,
        LoginComponent,
        OrdersComponent,
        EditProductModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
