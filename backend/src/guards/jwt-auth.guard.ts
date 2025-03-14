import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from "../app/app.service";
import { Response as ExpressResponse } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private appService: AppService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const response: ExpressResponse = context.switchToHttp().getResponse();
        const token = request.cookies['access_token'];
        const refreshToken = request.cookies['refresh_token'];

        if (!token && refreshToken) {
            try {
                const newToken = await this.appService.updateAccessToken(refreshToken, response);

                if (newToken) {
                    request.cookies['access_token'] = newToken;
                    response.cookie('access_token', newToken)

                    return true;
                }
            } catch (error) {
                throw new UnauthorizedException('Invalid refresh token');
            }
        }

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
