import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { RegisterDto } from '../../models/register-dto';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    protected registerDto: RegisterDto = new RegisterDto();

    constructor(protected authService: AuthService) {}

    register() {
        this.authService
            .register(this.registerDto)
            .pipe(
                catchError((e, _) => {
                    alert(e.error.message);
                    return EMPTY;
                })
            )
            .subscribe((success) => {
                if (success) {
                    alert('Registration successful');
                }
                // TODO show toast message
            });
    }
}
