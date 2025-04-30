import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDTO {
  @ApiProperty({
    example: 'OldPass123',
    required: true,
    description: 'Current password of the user (4 to 12 characters)',
    minLength: 4,
    maxLength: 12,
  })
  @IsNotEmpty()
  @Length(4, 12)
  currentPassword: string;

  @ApiProperty({
    example: 'NewPass456',
    required: true,
    description: 'New password to be set (4 to 12 characters)',
    minLength: 4,
    maxLength: 12,
  })
  @IsNotEmpty()
  @Length(4, 12)
  newPassword: string;
}
