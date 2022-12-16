import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService, UserStrippedPassword } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiBody({
        type: LoginCredentialsDto
    })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(
        @CurrentUser() user: UserStrippedPassword
    ): Promise<LoginResponse> {
        return {
            token: await this.authService.login(user.username),
            role: user.role
        };
    }

    @Post('/register')
    @HttpCode(204)
    async register(@Body() dto: CreateUserDto) {
        await this.authService.register(dto);
    }
}
