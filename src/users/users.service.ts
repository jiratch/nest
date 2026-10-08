import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';
import { NewUserDto } from './dto/new-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}


  create(userDto: UserDto) {
    const dto = this.userRepository.create(userDto);
    return this.userRepository.save(dto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, newUserDto: NewUserDto) {
    return this.userRepository.update(id, newUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
