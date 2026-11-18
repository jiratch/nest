import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto.js';

export class NewUserDto extends PartialType(UserDto) {}
