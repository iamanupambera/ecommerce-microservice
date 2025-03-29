import { Injectable } from '@nestjs/common';
import { MailService } from 'src/email/mail.service';
import {
  VerifyEmailDto,
  OtpEmailDto,
  ForgotPasswordDto,
  PasswordChangeDto,
} from '@repo/validator/index';

@Injectable()
export class AuthEmailService {
  constructor(private mailService: MailService) {}

  async verifyEmail({ receiverEmail, verifyLink }: VerifyEmailDto) {
    await this.mailService.sendVerificationEmail(receiverEmail, verifyLink);

    return {
      statusCode: 200,
      response: {},
      message: 'verify Email sent successfully',
    };
  }

  async otpEmail({ receiverEmail, otp, username }: OtpEmailDto) {
    await this.mailService.sendOtpEmail(receiverEmail, otp, username);

    return {
      statusCode: 200,
      response: {},
      message: 'otp sent successfully',
    };
  }

  async forgotPasswordEmail({
    receiverEmail,
    username,
    resetLink,
  }: ForgotPasswordDto) {
    await this.mailService.sendForgotPasswordEmail(
      receiverEmail,
      username,
      resetLink,
    );

    return {
      statusCode: 200,
      response: {},
      message: 'Email sent successfully',
    };
  }

  async passwordChange({ receiverEmail, username }: PasswordChangeDto) {
    await this.mailService.notifyChangePassword(receiverEmail, username);

    return {
      statusCode: 200,
      response: {},
      message: 'notify  sent successfully',
    };
  }
}
