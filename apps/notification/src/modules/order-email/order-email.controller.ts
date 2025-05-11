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

  @MessagePattern({ controller, cmd: 'sendOrderPlaced' })
  sendOrderPlaced(@Payload('payload') createOrderEmailDto: any) {
    return this.orderEmailService.sendOrderPlaced(createOrderEmailDto);
  }

  @MessagePattern({ controller, cmd: 'sendOrderExtension' })
  sendOrderExtension(@Payload('payload') createOrderEmailDto: any) {
    return this.orderEmailService.sendOrderExtension(createOrderEmailDto);
  }

  @MessagePattern({ controller, cmd: 'orderExtensionApprovalRequest' })
  orderExtensionApprovalRequest(@Payload('payload') createOrderEmailDto: any) {
    return this.orderEmailService.orderExtensionApprovalRequest(
      createOrderEmailDto,
    );
  }

  @MessagePattern({ controller, cmd: 'orderDeliveredNotification' })
  orderDeliveredNotification(@Payload('payload') createOrderEmailDto: any) {
    return this.orderEmailService.orderDeliveredNotification(
      createOrderEmailDto,
    );
  }
}
