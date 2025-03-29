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

  async sendVerificationEmail(receiverEmail: string, verifyLink: string) {
    const html = await renderEmail('VerifyEmail', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      verifyLink,
    });

    try {
      await this.mailerService.sendMail({
        to: receiverEmail,
        subject: 'Verify Your Email',
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async notifyChangePassword() {}

  async notifyChangeEmail() {}

  async sendOtpEmail(receiverEmail: string, otp: string, username: string) {
    const html = await renderEmail('OtpEmail', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      otp,
      username,
    });

    try {
      await this.mailerService.sendMail({
        to: receiverEmail,
        subject: `Here's your 6-digit verification code`,
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
