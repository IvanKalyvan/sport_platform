import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

    private transporter;
    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: configService.get<string>('EMAIL'),
                pass: configService.get<string>('APPPASS'),
            },
        });
    }

    async sendEmailVerification(email: string, confirmLink: string) {
        await this.transporter.sendMail({
            from: `Support ${this.configService.get<string>('EMAIL')}`,
            to: email,
            subject: 'Confirm Your Email',
            html: `<p>Click the link to verify your email: <a href="${confirmLink}">${confirmLink}</a></p>`,
        });
        return
    }

    async sendPasswordResetEmail(email: string, resetLink: string) {
        await this.transporter.sendMail({
            from: `Support ${this.configService.get<string>('EMAIL')}`,
            to: email,
            subject: 'Password Recovery',
            html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
        });
    }

}
