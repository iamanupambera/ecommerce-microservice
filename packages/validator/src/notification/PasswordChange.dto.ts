import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class PasswordChangeDto {
  @IsNotEmpty()
  @IsEmail()
  receiverEmail: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;
}
