import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() credentials: LoginCredentialsDto): Promise<string> {
        return this.authService.login(credentials);
    }

    @Post('/register')
    @HttpCode(204)
    async register(@Body() dto: CreateUserDto) {
        this.authService.register(dto);
    }
}
