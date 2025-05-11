import { Injectable } from '@nestjs/common';
import { MailService } from '../email/mail.service';
import { OfferEmailDto } from '@repo/validator/index';

@Injectable()
export class OrderEmailService {
  constructor(private mailService: MailService) {}

  async sendOfferEmail(body: OfferEmailDto) {
    await this.mailService.sendOfferEmail(body);

    return {
      statusCode: 200,
      response: {},
      message: 'offer Email sent successfully',
    };
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
    await this.mailService.sendOrderPlaced(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Email sent successfully',
    };
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
    await this.mailService.sendOrderExtension(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Email sent successfully',
    };
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
    await this.mailService.orderExtensionApprovalRequest(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Delivery Extension notification sent successfully',
    };
  }

  async orderDeliveredNotification(body: {
    buyerUsername: string;
    sellerUsername: string;
    title: string;
    orderUrl: string;
    receiverEmail: string;
  }) {
    await this.mailService.orderDeliveredNotification(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Delivery Extension notification sent successfully',
    };
  }
}
