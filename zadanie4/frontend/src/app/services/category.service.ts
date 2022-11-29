import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly CATEGORIES_URL = `${environment.apiUrl}/categories`;

    readonly notify = new Subject<void>();
    private __categories: Observable<Category[]>;

    get categories$(): Observable<Category[]> {
        return this.__categories;
    }

    constructor(private httpClient: HttpClient) {
        this.__categories = this.httpClient.get<Category[]>(
            this.CATEGORIES_URL
        );
    }
}
