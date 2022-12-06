import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterDto } from '../models/register-dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly AUTH_URL = `${environment.apiUrl}/auth`;
    private _authenticated = false;

    constructor(private httpClient: HttpClient) {}

    get authenticated(): boolean {
        return this._authenticated;
    }

    register(registerDto: RegisterDto): Observable<boolean> {
        return this.httpClient
            .post<void>(this.AUTH_URL + '/register', registerDto, {
                observe: 'response'
            })
            .pipe(
                map((res: HttpResponse<void>) => {
                    return res.status === 204;
                })
            );
    }
}
