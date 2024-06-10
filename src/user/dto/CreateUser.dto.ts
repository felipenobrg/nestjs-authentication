import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { isEmailUnique } from '../validation/uniqueEmailValidator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @isEmailUnique({ message: 'User already exits' })
  email: string;
  @MinLength(6)
  password: string;
}
