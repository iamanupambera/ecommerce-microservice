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
}
