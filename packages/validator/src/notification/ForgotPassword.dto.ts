import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  receiverEmail: string;

  @IsNotEmpty()
  @IsString()
  resetLink: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;
}
