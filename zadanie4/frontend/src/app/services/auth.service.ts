import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto } from '../models/login-dto';
import { LoginResponseDto } from '../models/login-response';
import { RegisterDto } from '../models/register-dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly AUTH_URL = `${environment.apiUrl}/auth`;
    private _authenticated = false;
    private _token: string | null = null;
    private _role: string | null = null;

    constructor(private httpClient: HttpClient) {}

    get authenticated(): boolean {
        return this._authenticated;
    }

    get token(): string | null {
        return this._token;
    }

    get role(): string | null {
        return this._role;
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

    login(loginDto: LoginDto): Observable<boolean> {
        return this.httpClient
            .post<LoginResponseDto>(this.AUTH_URL + '/login', loginDto)
            .pipe(
                map((dto) => {
                    this._token = dto.token;
                    this._role = dto.role;
                    this._authenticated = true;
                    return true;
                }),
                catchError(() => {
                    this._token = '';
                    this._authenticated = false;
                    this._role = null;
                    return of(false);
                })
            );
    }

    logout() {
        this._token = null;
        this._authenticated = false;
        this._role = null;
    }
}
