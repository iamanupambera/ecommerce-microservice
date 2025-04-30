import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username must be between 4 and 12 characters',
    minLength: 4,
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description: 'Password must be between 4 and 12 characters',
    minLength: 4,
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @ApiProperty({
    example: 'USA',
    description: 'Country of the user',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'Profile picture URL',
  })
  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @ApiProperty({
    example: 'Chrome',
    description: 'Browser name used during registration',
  })
  @IsNotEmpty()
  @IsString()
  browserName: string;

  @ApiProperty({
    example: 'Desktop',
    description: 'Device type used during registration',
  })
  @IsNotEmpty()
  @IsString()
  deviceType: string;
}
