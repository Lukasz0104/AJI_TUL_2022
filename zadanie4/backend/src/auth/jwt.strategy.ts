import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { UserStrippedPassword } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 's3cr3t'
        });
    }

    async validate(payload): Promise<UserStrippedPassword> {
        console.log(payload);
        const { password, ...user } = await this.userService.findByUsername(
            payload.sub
        );
        return user;
    }
}
