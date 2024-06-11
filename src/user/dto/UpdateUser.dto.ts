import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { isEmailUnique } from '../validation/uniqueEmailValidator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @isEmailUnique({ message: 'User already exits' })
  @IsOptional()
  email: string;

  @IsOptional()
  @MinLength(6)
  password: string;
}
