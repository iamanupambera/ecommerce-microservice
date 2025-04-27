import { Module } from '@nestjs/common';
import { ChatConsumerService } from './chat-consumer.service';
import { ChatConsumerController } from './chat-consumer.controller';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [StoresModule],
  controllers: [ChatConsumerController],
  providers: [ChatConsumerService],
})
export class ChatConsumerModule {}
