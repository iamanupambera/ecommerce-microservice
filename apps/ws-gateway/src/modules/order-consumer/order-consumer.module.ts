import { Module } from '@nestjs/common';
import { OrderConsumerService } from './order-consumer.service';
import { OrderConsumerController } from './order-consumer.controller';

@Module({
  controllers: [OrderConsumerController],
  providers: [OrderConsumerService],
})
export class OrderConsumerModule {}
