import { Injectable } from '@nestjs/common';
import { MailService } from 'src/email/mail.service';
import { VerifyEmailDto, OtpEmailDto } from '@repo/validator/index';

@Injectable()
export class AuthEmailService {
  constructor(private mailService: MailService) {}

  async verifyEmail({ receiverEmail, verifyLink }: VerifyEmailDto) {
    await this.mailService.sendVerificationEmail(receiverEmail, verifyLink);

    return {
      statusCode: 200,
      response: {},
      message: 'Email sent successfully',
    };
  }

  async otpEmail({ receiverEmail, otp, username }: OtpEmailDto) {
    await this.mailService.sendOtpEmail(receiverEmail, otp, username);

    return {
      statusCode: 200,
      response: {},
      message: 'Email sent successfully',
    };
  }
}
