import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @ValidateIf((object) => object.email === undefined, {
    message: 'Please enter username or email',
  })
  @IsString()
  @Length(4, 12)
  username?: string;

  @ValidateIf((object) => object.username === undefined, {
    message: 'Please enter username or email',
  })
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @IsOptional()
  @IsString()
  browserName?: string;

  @IsOptional()
  @IsString()
  deviceType?: string;
}
