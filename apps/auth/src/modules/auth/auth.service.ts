import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@repo/validator/index';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return registerDto;
  }
}
