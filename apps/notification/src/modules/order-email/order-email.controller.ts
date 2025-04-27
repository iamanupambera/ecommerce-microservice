import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEmailService } from './order-email.service';
import { GatewayJwtGuard } from '../../shared/gatewayJwt.guard';
import { OfferEmailDto } from '@repo/validator/index';
const controller = 'order_email_controller';

@Controller()
@UseGuards(GatewayJwtGuard)
export class OrderEmailController {
  constructor(private readonly orderEmailService: OrderEmailService) {}

  @MessagePattern({ controller, cmd: 'sendOfferEmail' })
  sendOfferEmail(@Payload('payload') createOrderEmailDto: OfferEmailDto) {
    return this.orderEmailService.sendOfferEmail(createOrderEmailDto);
  }
}
