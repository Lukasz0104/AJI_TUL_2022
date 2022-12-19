import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly CATEGORIES_URL = `${environment.apiUrl}/categories`;

    readonly notify = new Subject<void>();
    private _categories: Observable<Category[]>;

    get categories$(): Observable<Category[]> {
        return this._categories;
    }

    constructor(private httpClient: HttpClient) {
        this._categories = this.httpClient
            .get<Category[]>(this.CATEGORIES_URL)
            .pipe(shareReplay(1));
    }
}
