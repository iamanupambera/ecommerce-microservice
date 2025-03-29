import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthEmailService } from './auth-email.service';
import { OtpEmailDto, VerifyEmailDto } from '@repo/validator/index';

const controller = 'auth_email_controller';

@Controller()
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @EventPattern({ controller, cmd: 'verifyEmail' })
  verifyEmail(@Payload('payload') payload: VerifyEmailDto) {
    return this.authEmailService.verifyEmail(payload);
  }

  @EventPattern({ controller, cmd: 'otpEmail' })
  otpEmail(@Payload('payload') payload: OtpEmailDto) {
    return this.authEmailService.otpEmail(payload);
  }
}
