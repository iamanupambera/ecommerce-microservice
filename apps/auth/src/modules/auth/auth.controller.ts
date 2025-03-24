import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from '@repo/validator/index';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  create(@Payload() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }
}
