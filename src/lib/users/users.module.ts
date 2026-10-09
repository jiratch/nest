import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service.js';
import { UsersController } from './users.controller.js';
import { UserEntity } from './entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMapper } from './mapper/users_mapper.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService , UsersMapper],
})
export class UsersModule {}
