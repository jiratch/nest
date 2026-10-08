import { IsEmail, IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
