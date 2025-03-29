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

  async sendForgotPasswordEmail(
    receiverEmail: string,
    username: string,
    resetLink: string,
  ) {
    const html = await renderEmail('ForgotPassword', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      username,
      resetLink,
    });

    try {
      await this.mailerService.sendMail({
        to: receiverEmail,
        subject: 'Reset your Password',
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async notifyChangePassword(receiverEmail: string, username: string) {
    const html = await renderEmail('PasswordChange', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      username,
    });

    try {
      await this.mailerService.sendMail({
        to: receiverEmail,
        subject: 'Password change Successfully!',
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
