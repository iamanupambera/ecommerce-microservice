import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderEmail } from '@repo/emails';

const appIcon = 'https://i.ibb.co/Kyp2m0t/cover.png';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, verifyLink: string) {
    const html = await renderEmail('VerifyEmail', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      verifyLink,
    });
    console.log({ html });

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "Here's your 6-digit verification code",
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async notifyChangePassword() {}

  async notifyChangeEmail() {}

  async sendOtp() {}
}
