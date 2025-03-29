import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class OtpEmailDto {
  @IsNotEmpty()
  @IsEmail()
  receiverEmail: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  otp: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;
}
