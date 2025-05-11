import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEmailService } from './order-email.service';
import { GatewayJwtGuard } from '../../shared/gatewayJwt.guard';
import {
  ApproveOrderExtendRequestDto,
  OfferEmailDto,
  OrderDeliveredNotificationDto,
  OrderExtendDto,
  PlacedOrderDto,
} from '@repo/validator/index';
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
  sendOrderPlaced(@Payload('payload') placedOrderDto: PlacedOrderDto) {
    return this.orderEmailService.sendOrderPlaced(placedOrderDto);
  }

  @MessagePattern({ controller, cmd: 'sendOrderExtension' })
  sendOrderExtension(@Payload('payload') orderExtendDto: OrderExtendDto) {
    return this.orderEmailService.sendOrderExtension(orderExtendDto);
  }

  @MessagePattern({ controller, cmd: 'orderExtensionApprovalRequest' })
  orderExtensionApprovalRequest(
    @Payload('payload') body: ApproveOrderExtendRequestDto,
  ) {
    return this.orderEmailService.orderExtensionApprovalRequest(body);
  }

  @MessagePattern({ controller, cmd: 'orderDeliveredNotification' })
  orderDeliveredNotification(
    @Payload('payload') body: OrderDeliveredNotificationDto,
  ) {
    return this.orderEmailService.orderDeliveredNotification(body);
  }
}
