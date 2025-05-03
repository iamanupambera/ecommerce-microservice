import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderConsumerService } from './order-consumer.service';

@Controller()
export class OrderConsumerController {
  constructor(private readonly orderConsumerService: OrderConsumerService) {}

  @MessagePattern('createOrderConsumer')
  create(@Payload() createOrderConsumerDto: any) {
    return this.orderConsumerService.create(createOrderConsumerDto);
  }

  @MessagePattern('findAllOrderConsumer')
  findAll() {
    return this.orderConsumerService.findAll();
  }

  @MessagePattern('findOneOrderConsumer')
  findOne(@Payload() id: number) {
    return this.orderConsumerService.findOne(id);
  }

  @MessagePattern('updateOrderConsumer')
  update(@Payload() updateOrderConsumerDto: any) {
    return this.orderConsumerService.update(
      updateOrderConsumerDto.id,
      updateOrderConsumerDto,
    );
  }

  @MessagePattern('removeOrderConsumer')
  remove(@Payload() id: number) {
    return this.orderConsumerService.remove(id);
  }
}
