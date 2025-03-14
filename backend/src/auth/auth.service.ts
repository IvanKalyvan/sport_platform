import { Injectable } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import * as argon2 from 'argon2';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly mailService: MailService,
    ) {}

    async register(email: string, password: string) {

        const userExist = await this.userRepository.findOne({ where: { email } });

        if (userExist) {
            return { success: false, message: 'User with this email already exists' };
        }

        const hashedPassword = await argon2.hash(password);

        const confirmToken = uuidv4();

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            confirmToken,
            confirmEmail: false,
        });

        await this.userRepository.save(user);

        const confirmLink = `http://localhost:3001/auth/confirm-email?token=${confirmToken}`;

        await this.mailService.sendEmailVerification(email, confirmLink);

        return {
            response_status: 200,
            status: 'success',
            message: 'User registered successfully. Please check your email to confirm your account.'
        };
    }

    async login(email: string, password: string, res: ExpressResponse) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!user.confirmEmail) {
            return res.status(403).json({ message: 'Please confirm your email before logging in' });
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const payload = { username: user.email, sub: user.id };

        const refreshToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
        const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

        res.cookie('access_token', token);
        res.cookie('refresh_token', refreshToken);

        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return res.json({ message: 'Login successful' });
    }

    async refreshPassword(email: string, password: string, access_token: string | undefined) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return { message: 'User not found' };
        }

        if (access_token != undefined) {

            user.password = await argon2.hash(password);

            await this.userRepository.save(user);
            return user;

        }

        else {

            const token = uuidv4();
            password = await argon2.hash(password)

            await this.userRepository.update(user.id, {
                resetPasswordToken: token,
            });

            const resetLink = `http://localhost:3001/auth/reset-password?token=${token}&password=${encodeURIComponent(password)}`;

            await this.mailService.sendPasswordResetEmail(email, resetLink);

            return {message: 'Password reset link sent successfully.'};

        }
    }

    async confirmUserEmail(token: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { confirmToken: token } });

        if (!user) {
            return null;
        }

        user.confirmEmail = true;
        user.confirmToken = null;

        await this.userRepository.save(user);
        return user;

    }

    async confirmNewPassword(token: string, password: string): Promise<User | null> {

        const user = await this.userRepository.findOne({ where: { resetPasswordToken: token} });

        if (!user) {
            return null;
        }

        user.resetPasswordToken = null;
        user.password = password;

        await this.userRepository.save(user);
        return user;

    }

}
