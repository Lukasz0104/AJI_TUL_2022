import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private readonly PRODUCTS_URL = `${environment.apiUrl}/products`;

    constructor(private httpClient: HttpClient) {}

    get(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.PRODUCTS_URL).pipe(retry(5));
    }
}
