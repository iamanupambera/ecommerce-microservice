import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @IsNotEmpty()
  @IsString()
  browserName: string;

  @IsNotEmpty()
  @IsString()
  deviceType: string;
}
