import {Injectable, Query} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCredentials, GamerProfile } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserCredentials)
        private usersCredentialsRepository: Repository<UserCredentials>,
    ) {}

    async findByEmail(email: string): Promise<UserCredentials | null> {
        return this.usersCredentialsRepository.findOne({ where: { email } });
    }

}

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserCredentials)
        private userCredentialsRepository: Repository<UserCredentials>,
        @InjectRepository(GamerProfile)
        private gamerProfileRepository: Repository<GamerProfile>,
    ) {}

    async gamerProfileData(email: string) {

        const userCredentials = await this.userCredentialsRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        if (!userCredentials) {
            return { success: false, message: 'No user with this email' };
        }

        const user = await this.userRepository.findOne({
            where: { credentials: userCredentials },
        })

        if (!user) {

            return { success: false, message: 'No user' };

        }

        const gamerProfile = await this.gamerProfileRepository.findOne({

            where: { user_id: user },
            select: ['id', 'name', 'age', 'sex', 'location', 'skill_lvl', 'experience'],

        })

        return { success: true, gamerProfile: gamerProfile };

    }

}