import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity.js";

export const mysqlConfig = {
    imports : [ConfigModule],
    inject : [ConfigService],
    useFactory : (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 3306,
        username: configService.get<string>('DB_USER') || 'root',
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_NAME') || 'mydb',
        entities: [UserEntity],
        synchronize: process.env.NODE_ENV !== 'production'
    }),
};
