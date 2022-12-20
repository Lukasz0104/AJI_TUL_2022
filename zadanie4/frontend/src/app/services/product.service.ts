import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { UpdateProductDto } from '../models/update-product-dto';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly PRODUCTS_URL = `${environment.apiUrl}/products`;

    constructor(private httpClient: HttpClient) {}

    get(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.PRODUCTS_URL).pipe(retry(5));
    }

    update(id: number, dto: UpdateProductDto): Observable<Product> {
        return this.httpClient.patch<Product>(
            `${this.PRODUCTS_URL}/${id}`,
            dto
        );
    }
}
