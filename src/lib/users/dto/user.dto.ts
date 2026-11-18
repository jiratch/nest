import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
