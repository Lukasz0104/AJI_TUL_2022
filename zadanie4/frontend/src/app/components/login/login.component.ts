import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/login-dto';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    protected loginDto: LoginDto = new LoginDto();

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    login() {
        this.authService.login(this.loginDto).subscribe((success) => {
            if (success) {
                this.router.navigate(['/']);
            }
            this.loginDto.username = '';
            this.loginDto.password = '';
        });
    }
}
