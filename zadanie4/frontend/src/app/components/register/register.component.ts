import { Component } from '@angular/core';
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
        // TODO add validation
        this.authService.register(this.registerDto).subscribe((success) => {
            console.log(success);
            // TODO show toast message
        });
    }
}
