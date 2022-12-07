import {
    Body,
    Controller,
    Header,
    HttpCode,
    Post,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @Header('content-type', 'text/plain')
    @UseGuards(LocalAuthGuard)
    async login(@Body() credentials: LoginCredentialsDto): Promise<string> {
        return this.authService.login(credentials);
    }

    @Post('/register')
    @HttpCode(204)
    async register(@Body() dto: CreateUserDto) {
        await this.authService.register(dto);
    }
}
