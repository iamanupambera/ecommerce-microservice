import { Injectable } from '@nestjs/common';
import { MailService } from '../email/mail.service';
import {
  ApproveOrderExtendRequestDto,
  OfferEmailDto,
  OrderDeliveredNotificationDto,
  OrderExtendDto,
  PlacedOrderDto,
} from '@repo/validator/index';

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

  async sendOrderPlaced(body: PlacedOrderDto) {
    await this.mailService.sendOrderPlaced(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Email sent successfully',
    };
  }

  async sendOrderExtension(body: OrderExtendDto) {
    await this.mailService.sendOrderExtension(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Email sent successfully',
    };
  }

  async orderExtensionApprovalRequest(body: ApproveOrderExtendRequestDto) {
    await this.mailService.orderExtensionApprovalRequest(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Delivery Extension notification sent successfully',
    };
  }

  async orderDeliveredNotification(body: OrderDeliveredNotificationDto) {
    await this.mailService.orderDeliveredNotification(body);

    return {
      statusCode: 200,
      response: {},
      message: 'order Delivery Extension notification sent successfully',
    };
  }
}
