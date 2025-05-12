import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderConsumerService } from './order-consumer.service';

@Controller()
export class OrderConsumerController {
  constructor(private readonly orderConsumerService: OrderConsumerService) {}

  @MessagePattern({
    controller: 'order-consumer',
    cmd: 'sendOrderNotification',
  })
  sendOrderNotification(
    @Payload('payload')
    body: {
      notification: { userTo: string };
      order: object;
    },
  ) {
    return this.orderConsumerService.sendOrderNotification(
      body.notification,
      body.order,
    );
  }
}
