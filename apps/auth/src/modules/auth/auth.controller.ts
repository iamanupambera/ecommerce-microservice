import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@repo/validator/index';
const controller = 'auth_controller';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ controller, cmd: 'register' })
  register(@Payload('payload') createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @MessagePattern({ controller, cmd: 'login' })
  login(@Payload('payload') createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }
}
