import { Module } from '@nestjs/common';
import { OrderEmailService } from './order-email.service';
import { OrderEmailController } from './order-email.controller';

@Module({
  controllers: [OrderEmailController],
  providers: [OrderEmailService],
})
export class OrderEmailModule {}
