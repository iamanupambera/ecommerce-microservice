import { Injectable } from '@nestjs/common';
import { MailService } from 'src/email/mail.service';
import { VerifyEmailDto } from '@repo/validator/index';

@Injectable()
export class AuthEmailService {
  constructor(private mailService: MailService) {}
  async verifyEmail(payload: VerifyEmailDto) {
    await this.mailService.sendVerifiactionEmail(
      payload.receiverEmail,
      payload.verifyLink,
    );

    return {
      statusCode: 200,
      response: {},
      message: 'Email sent successfully',
    };
  }
}
