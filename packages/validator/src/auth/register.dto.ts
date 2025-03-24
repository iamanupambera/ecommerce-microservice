import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsOptional()
  @IsString()
  browserName?: string;

  @IsOptional()
  @IsString()
  deviceType?: string;
}
