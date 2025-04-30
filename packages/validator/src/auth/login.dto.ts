import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username or email of the user',
  })
  @IsNotEmpty()
  @IsString()
  identifier: string;

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
    example: 'Chrome',
    description: 'Browser used to log in',
  })
  @IsNotEmpty()
  @IsString()
  browserName: string;

  @ApiProperty({
    example: 'Mobile',
    description: 'Device type used to log in',
  })
  @IsNotEmpty()
  @IsString()
  deviceType: string;
}
