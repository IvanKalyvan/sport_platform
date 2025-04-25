import { Injectable } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCredentials, UserTypes, GamerProfile } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserCredentials)
        private userCredentialsRepository: Repository<UserCredentials>,
        @InjectRepository(UserTypes)
        private userTypesRepository: Repository<UserTypes>,
        @InjectRepository(GamerProfile)
        private userProfileRepository: Repository<GamerProfile>,
        private readonly mailService: MailService,
    ) {}

    async register(email: string, password: string, userType: string, res: ExpressResponse) {

        const userExist = await this.userCredentialsRepository.findOne({ where: { email } });

        if (userExist) {

            return res.status(401).json({ message: 'This email is already in use.' });

        }

        const user_type = await this.userTypesRepository.findOne({ where: { type_name: userType } });

        if (!user_type) {
            return res.status(401).json({ message: 'Invalid user type' });
        }

        const hashedPassword = await argon2.hash(password);

        const confirmToken = uuidv4();

        const user_credentials = this.userCredentialsRepository.create({
            email,
            password: hashedPassword,
            confirmToken,
            confirmEmail: false,
        });

        await this.userCredentialsRepository.save(user_credentials);

        const newUser = this.userRepository.create({
            credentials: user_credentials,
            type: user_type,
        });

        await this.userRepository.save(newUser);

        const confirmLink = `http://localhost:3001/auth/confirm-email?token=${confirmToken}`;

        await this.mailService.sendEmailVerification(email, confirmLink);

        return res.status(200).json({ message: 'User registered successfully. Please check your email to confirm your account.' });

    }

    async register_profile(email: string, name: string, age: number, sex: string, location: string, skill_lvl: number, experience: string) {

        const userCredentials = await this.userCredentialsRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        if (!userCredentials) {
            return { success: false, message: 'No user with this email' };
        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
            relations: ['type'],
        })

        if (!user) {

            return { success: false, message: 'No user' };

        }

        if (user?.type.id != 1) {

            return { success: false, message: 'UserTypeError' };

        }

        const userProfile = this.userProfileRepository.create({
                user_id: user,
                name,
                age,
                sex,
                location,
                skill_lvl,
                experience
            });

        await this.userProfileRepository.save(userProfile);

        return {
            response_status: 200,
            status: 'success',
            message: 'Profile updated successfully'
        };
    }

    async login(email: string, password: string, res: ExpressResponse) {

        const userCredentials = await this.userCredentialsRepository.findOne(
            { where : { email },
            select: ['id', 'email', 'password', 'confirmEmail']
            },
        );

        if (!userCredentials) {

            return res.status(401).json({ success: false, message: 'Invalid user credentials' });

        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
            relations: ['type'],
        });

        if (!userCredentials.confirmEmail) {
            return res.status(403).json({ message: 'Please confirm your email before logging in' });
        }

        const isPasswordValid = await argon2.verify(userCredentials.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const payload = { username: userCredentials.email, sub: userCredentials.id, userType: user?.type.type_name };

        const refreshToken = await this.jwtService.sign(payload, { expiresIn: '7d' });
        const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

        res.cookie('access_token', token);
        res.cookie('refresh_token', refreshToken);

        userCredentials.refreshToken = refreshToken;
        await this.userCredentialsRepository.save(userCredentials);

        return res.json({ message: 'Login successful' });
    }

    async refreshPassword(email: string, password: string, access_token: string | undefined) {

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return { message: 'User not found' };
        }

        if (access_token != undefined) {

            user.password = await argon2.hash(password);
            user.resetPasswordToken = null;

            await this.userRepository.save(user);
            return user;

        }

        else {

            const token = uuidv4();
            password = await argon2.hash(password)

            await this.userCredentialsRepository.update(user.id, {
                resetPasswordToken: token,
            });

            const resetLink = `http://localhost:3001/auth/reset-password?token=${token}&password=${encodeURIComponent(password)}`;

            await this.mailService.sendPasswordResetEmail(email, resetLink);

            return {message: 'Password reset link sent successfully.'};

        }
    }

    async confirmUserEmail(token: string): Promise<UserCredentials | null> {
        const user = await this.userCredentialsRepository.findOne({ where: { confirmToken: token } });

        if (!user) {
            return null;
        }

        user.confirmEmail = true;
        user.confirmToken = null;

        await this.userCredentialsRepository.save(user);
        return user;

    }

    async confirmNewPassword(token: string, password: string): Promise<UserCredentials | null> {

        const user = await this.userCredentialsRepository.findOne({ where: { resetPasswordToken: token} });

        if (!user) {
            return null;
        }

        user.resetPasswordToken = null;
        user.password = password;

        await this.userCredentialsRepository.save(user);
        return user;

    }

    async giveRoles() {

        const roles = await this.userTypesRepository
            .createQueryBuilder("userType")
            .select("userType.type_name")
            .getRawMany();

        return roles.map(role => role.userType_type_name);

    }

}
