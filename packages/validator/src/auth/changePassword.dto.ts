import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @Length(4, 12)
  currentPassword: string;

  @IsNotEmpty()
  @Length(4, 12)
  newPassword: string;
}
