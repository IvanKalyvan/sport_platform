import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@users/user.entity';

export const databaseConfig = (configService: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: Number(configService.get<string>('DATABASE_PORT')),
    username: configService.get<string>('DATABASE_USER'),
    password: String(configService.get<string>('DATABASE_PASSWORD')),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [User],
    migrations: [__dirname + '/../migrations/*.ts'],
    synchronize: true,
    logging: true,
});
