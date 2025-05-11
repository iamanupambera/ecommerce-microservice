import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderEmail } from '@repo/emails';
import { LoggerService } from '@repo/modules/index';

const appIcon = 'https://i.ibb.co/Kyp2m0t/cover.png';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
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
      this.logger.log(
        'error',
        MailService.name + ' service error at sendVerificationEmail',
        error,
      );
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
      this.logger.log(
        'error',
        MailService.name + ' service error at sendForgotPasswordEmail',
        error,
      );
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
      this.logger.log(
        'error',
        MailService.name + ' service error at notifyChangePassword',
        error,
      );
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
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOtpEmail',
        error,
      );
    }
  }

  async sendOfferEmail(body: {
    buyerUsername: string;
    sellerUsername: string;
    title: string;
    description: string;
    deliveryDays: number;
    offerLink: string;
    amount: number;
    receiverEmail: string;
    sender: string;
  }) {
    const html = await renderEmail('Offer', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      buyerUsername: body.buyerUsername,
      sellerUsername: body.sellerUsername,
      title: body.title,
      description: body.description,
      deliveryDays: body.deliveryDays,
      offerLink: body.offerLink,
      amount: body.amount,
    });

    try {
      await this.mailerService.sendMail({
        to: body.receiverEmail,
        subject: `You have received a custom offer from ${body.sender}`,
        html,
      });
    } catch (error) {
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOfferEmail',
        error,
      );
    }
  }

  async sendOrderPlaced(body: {
    orderId: string;
    orderDue: string;
    amount: number;
    buyerUsername: string;
    sellerUsername: string;
    title: string;
    description: string;
    requirements: string;
    orderUrl: string;
    receiverEmail: string;
  }) {
    const html = await renderEmail('OrderPlaced', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      orderId: body.orderId,
      orderDue: body.orderDue,
      amount: body.amount,
      buyerUsername: body.buyerUsername,
      sellerUsername: body.sellerUsername,
      title: body.title,
      description: body.description,
      requirements: body.requirements,
      orderUrl: body.orderUrl,
    });

    try {
      await this.mailerService.sendMail({
        to: body.receiverEmail,
        subject: `You've received an order from ${body.buyerUsername}`,
        html,
      });
    } catch (error) {
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOrderPlaced',
        error,
      );
    }
  }

  async sendOrderExtension(body: {
    buyerUsername: string;
    sellerUsername: string;
    originalDate: string;
    newDate: string;
    reason: string;
    orderUrl: string;
    receiverEmail: string;
  }) {
    const html = await renderEmail('OrderExtension', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      buyerUsername: body.buyerUsername,
      sellerUsername: body.sellerUsername,
      orderUrl: body.orderUrl,
      newDate: body.newDate,
      originalDate: body.originalDate,
      reason: body.reason,
    });

    try {
      await this.mailerService.sendMail({
        to: body.receiverEmail,
        subject: `You received a delivery extension request from ${body.sellerUsername}`,
        html,
      });
    } catch (error) {
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOrderExtension',
        error,
      );
    }
  }

  async orderExtensionApprovalRequest(body: {
    subject: string;
    buyerUsername: string;
    sellerUsername: string;
    orderUrl: string;
    header: string;
    message: string;
    type: string;
    receiverEmail: string;
  }) {
    const html = await renderEmail('OrderExtensionApproval', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      buyerUsername: body.buyerUsername,
      sellerUsername: body.sellerUsername,
      orderUrl: body.orderUrl,
      header: body.header,
      message: body.message,
      type: body.type,
    });

    try {
      await this.mailerService.sendMail({
        to: body.receiverEmail,
        subject: body.subject,
        html,
      });
    } catch (error) {
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOrderPlaced',
        error,
      );
    }
  }

  async orderDeliveredNotification(body: {
    buyerUsername: string;
    sellerUsername: string;
    orderUrl: string;
    title: string;
    receiverEmail: string;
  }) {
    const html = await renderEmail('OrderDelivered', {
      appLink: `${this.configService.getOrThrow('CLIENT_URL')}`,
      appIcon,
      buyerUsername: body.buyerUsername,
      sellerUsername: body.sellerUsername,
      orderUrl: body.orderUrl,
      title: body.title,
    });

    try {
      await this.mailerService.sendMail({
        to: body.receiverEmail,
        subject: 'Consider it done: Your order is ready for review',
        html,
      });
    } catch (error) {
      this.logger.log(
        'error',
        MailService.name + ' service error at sendOrderPlaced',
        error,
      );
    }
  }
}
