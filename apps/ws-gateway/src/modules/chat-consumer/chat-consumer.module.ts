import { Module } from '@nestjs/common';
import { ChatConsumerService } from './chat-consumer.service';
import { ChatConsumerController } from './chat-consumer.controller';

@Module({
  controllers: [ChatConsumerController],
  providers: [ChatConsumerService],
})
export class ChatConsumerModule {}
