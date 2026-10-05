import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user with name: ' + createUserDto.name + ' and email: ' + createUserDto.email;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user.  new name: ${updateUserDto.name}, new email: ${updateUserDto.email}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
