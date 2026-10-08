import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/mysql.config.js';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/.env',
    }),
    TypeOrmModule.forRootAsync(mysqlConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
