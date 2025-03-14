import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({where: {id}});
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await this.usersRepository.update(userId, { refreshToken });
    }
}
