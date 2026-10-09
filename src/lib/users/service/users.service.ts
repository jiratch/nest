import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto.js';
import { NewUserDto } from '../dto/new-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity.js';
import { Repository } from 'typeorm';
import { handleDuplicateEmailError } from '../response/users.errors.js';
import { UsersMapper } from '../mapper/users_mapper.js';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly userMapper: UsersMapper
  ) {}


  async create(userDto: UserDto) {
    const dto = this.userRepository.create(userDto);
    try {
      return await this.userRepository.save(dto);
    } catch (error: unknown) {
      handleDuplicateEmailError(error);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {

   const user = await this.userRepository.findOne({ where: { id } });

    if(!user) throw new NotFoundException(`User ${id} not found`);
    return user;

  }

  async update(id: number, newUserDto: NewUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, newUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (error: unknown) {
      handleDuplicateEmailError(error);
    }
  }

  async remove(id: number) {
     const result = await this.userRepository.delete(id);
    if (!result.affected) throw new NotFoundException(`User ${id} not found`);
  }

}
