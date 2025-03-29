import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class PasswordDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
