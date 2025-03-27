import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthEmailService } from './auth-email.service';
const controller = 'auth_email_controller';

@Controller()
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @EventPattern({ controller, cmd: 'otpEmail' })
  sendOtp(@Payload() payload: object) {
    return this.authEmailService.sendOtp(payload);
  }
}
