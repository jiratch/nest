import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service.js';
import { UserEntity } from './entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
