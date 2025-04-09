import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthEmailService } from './auth-email.service';
import {
  OtpEmailDto,
  VerifyEmailDto,
  ForgotPasswordDto,
  PasswordChangeDto,
} from '@repo/validator/index';
import { GatewayJwtGuard } from '../../shared/gatewayJwt.guard';

const controller = 'auth_email_controller';

@Controller()
@UseGuards(GatewayJwtGuard)
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @MessagePattern({ controller, cmd: 'verifyEmail' })
  verifyEmail(@Payload('payload') payload: VerifyEmailDto) {
    return this.authEmailService.verifyEmail(payload);
  }

  @MessagePattern({ controller, cmd: 'otpEmail' })
  otpEmail(@Payload('payload') payload: OtpEmailDto) {
    return this.authEmailService.otpEmail(payload);
  }

  @MessagePattern({ controller, cmd: 'forgotPassword' })
  forgotPasswordEmail(@Payload('payload') payload: ForgotPasswordDto) {
    return this.authEmailService.forgotPasswordEmail(payload);
  }

  @MessagePattern({ controller, cmd: 'passwordChange' })
  passwordChange(@Payload('payload') payload: PasswordChangeDto) {
    return this.authEmailService.passwordChange(payload);
  }
}
