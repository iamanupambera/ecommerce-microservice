import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  receiverEmail: string;

  @IsNotEmpty()
  @IsString()
  verifyLink: string;
}
