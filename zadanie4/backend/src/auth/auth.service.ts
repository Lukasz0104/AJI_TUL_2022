import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

export type UserStrippedPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        username: string,
        password: string
    ): Promise<UserStrippedPassword> {
        const user = await this.userService.findByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...userNoPass } = user;
            return userNoPass;
        }
        return null;
    }

    async login(user: LoginCredentialsDto) {
        return this.jwtService.sign({ sub: user.username });
    }

    async register(userData: CreateUserDto) {
        await this.userService.create(userData);
    }
}
