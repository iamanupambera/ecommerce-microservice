import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBuyerDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
