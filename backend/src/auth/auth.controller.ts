import {Controller, Post, Body, Get, Query, Response, Redirect} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';
import { RegisterDto } from './dto/RegisterDto.dto';
import { RegisterProfileDto } from "./dto/RegisterProfileDto.dto";
import { LoginDto } from './dto/LoginDto.dto';
import { ResetPasswordDto } from "./dto/ResetPasswordDto.tdo";
import { ConfirmEmailDto } from "./dto/ConfirmEmailDto.dto";
import { ConfirmResetPasswordDto } from "./dto/ConfirmResetPasswordDto.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() RegisterLoginDTO: LoginDto, @Response() res: ExpressResponse) {

        return await this.authService.login(RegisterLoginDTO.email, RegisterLoginDTO.password, res);
    }

    @Post('register')
    async register(@Body() RegisterLoginDTO: RegisterDto, @Response() res: ExpressResponse) {
        return this.authService.register(RegisterLoginDTO.email, RegisterLoginDTO.password, RegisterLoginDTO.user_type, res);
    }

    @Post('register-profile')
    async registerProfile(@Body() RegisterProfileDTO: RegisterProfileDto) {

        return this.authService.register_profile(

            RegisterProfileDTO.email,
            RegisterProfileDTO.name,
            RegisterProfileDTO.age,
            RegisterProfileDTO.sex,
            RegisterProfileDTO.location,
            RegisterProfileDTO.skill_lvl,
            RegisterProfileDTO.experience

        )

    }

    @Post('reset-password')
    async refresh(@Body() ResetPasswordDTO: ResetPasswordDto) {
        return this.authService.refreshPassword(ResetPasswordDTO.email, ResetPasswordDTO.password, ResetPasswordDTO.access_token);
    }

    @Get('confirm-email')
    @Redirect()
    async confirmEmail(@Query() ConfirmEmailDTO: ConfirmEmailDto) {

        const token = ConfirmEmailDTO.token;

        if (!token) {

            return { url: 'http://localhost:3000/confirm-email?message=Token%20is%20required&error=true', statusCode: 302 };
        }

        const user = await this.authService.confirmUserEmail(token);

        if (user) {

            return { url: 'http://localhost:3000/confirm-email?message=Email%20confirmed%20successfully&error=false', statusCode: 302 };
        } else {

            return { url: 'http://localhost:3000/confirm-email?message=Invalid%20or%20expired%20token&error=true', statusCode: 302 };
        }
    }

    @Get('reset-password')
    @Redirect()
    async resetPassword(@Query() ConfirmResetPasswordDTO: ConfirmResetPasswordDto) {

        const token = ConfirmResetPasswordDTO.token;
        const password = ConfirmResetPasswordDTO.password;
        const newPassword = decodeURIComponent(password);

        if (!token) {

            return { url: 'http://localhost:3000/reset-password?message=Token%20is%20required&error=true', statusCode: 302 };
        }

        const user = await this.authService.confirmNewPassword(token, newPassword);

        if (user) {

            return { url: 'http://localhost:3000/reset-password?message=Email%20confirmed%20successfully&error=false', statusCode: 302 };

        } else {

            return { url: 'http://localhost:3000/reset-password?message=Invalid%20or%20expired%20token&error=true', statusCode: 302 };
        }
    }

    @Get('user-roles')
    async getUserRoles() {

        return this.authService.giveRoles();

    }

}
