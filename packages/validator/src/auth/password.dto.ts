import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordDTO {
  @ApiProperty({
    example: 'NewPass123',
    description: 'New password (must be 4 to 12 characters long)',
    minLength: 4,
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  password: string;

  @ApiProperty({
    example: 'NewPass123',
    description: 'Confirm new password (must match password)',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email associated with the account',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
