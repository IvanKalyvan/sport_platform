import { Catch, ExceptionFilter, UnauthorizedException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class JwtAuthExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        if (response.headersSent) return;

        response.status(401).json({
            message: 'Unauthorized, please log in.',
            redirect: "http://localhost:3000/login"
        });
    }
}
