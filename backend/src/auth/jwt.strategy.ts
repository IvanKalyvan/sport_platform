import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("JWT_SECRET") || 'dsdsdssfdfsdfsdfsdfdsfsdfsdfsdfsfssfdssgrdd',
        } as any);
    }

    async validate(payload: any): Promise<UserCredentials> {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) throw new Error('Unauthorized');
        return user;
    }
}
