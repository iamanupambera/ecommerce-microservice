import { Module } from '@nestjs/common';
import { OrderEmailService } from './order-email.service';
import { OrderEmailController } from './order-email.controller';
import { MailModule } from '../email/mail.module';

@Module({
  imports: [MailModule],
  controllers: [OrderEmailController],
  providers: [OrderEmailService],
})
export class OrderEmailModule {}
