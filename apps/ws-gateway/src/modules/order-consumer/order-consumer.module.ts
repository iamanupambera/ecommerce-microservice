import { Module } from '@nestjs/common';
import { OrderConsumerService } from './order-consumer.service';
import { OrderConsumerController } from './order-consumer.controller';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [StoresModule],
  controllers: [OrderConsumerController],
  providers: [OrderConsumerService],
})
export class OrderConsumerModule {}
