import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered email address used to send the OTP',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Chrome',
    description: 'Browser used during the OTP verification process',
  })
  @IsNotEmpty()
  @IsString()
  browserName: string;

  @ApiProperty({
    example: 'Mobile',
    description: 'Device type used during the OTP verification process',
  })
  @IsNotEmpty()
  @IsString()
  deviceType: string;

  @ApiProperty({
    example: '123456',
    description: "6-digit numeric OTP sent to the user's email",
    minLength: 6,
    maxLength: 6,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  otp: string;
}
