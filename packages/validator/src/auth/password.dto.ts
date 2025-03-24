import { IsNotEmpty, Length, ValidateIf } from 'class-validator';

export class PasswordDTO {
  @IsNotEmpty()
  @Length(4, 12)
  password: string;

  @IsNotEmpty()
  @ValidateIf((object, value) => object.password !== value, {
    message: 'Passwords and confirmPassword should match',
  })
  confirmPassword: string;
}
