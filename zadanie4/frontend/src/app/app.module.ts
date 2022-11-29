import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductsComponent,
        ProductsFilterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
