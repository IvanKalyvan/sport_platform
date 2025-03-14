import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/user.entity';
import { UsersService } from '@users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
            passReqToCallback: true,
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) throw new Error('Unauthorized');
        return user;
    }
}
