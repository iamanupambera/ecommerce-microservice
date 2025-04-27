import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ChatConsumerService } from './chat-consumer.service';
import { MessageEventDto } from '@repo/validator/index';
const controller = 'chat_consumer';

@Controller()
export class ChatConsumerController {
  constructor(private readonly chatConsumerService: ChatConsumerService) {}

  @EventPattern({ controller, cmd: 'createMessage' })
  createMessage(@Payload('payload') createChatConsumerDto: MessageEventDto) {
    return this.chatConsumerService.createMessage(createChatConsumerDto);
  }

  @EventPattern({ controller, cmd: 'updateMessage' })
  updateMessage(@Payload('payload') updateChatConsumerDto: MessageEventDto) {
    return this.chatConsumerService.updateMessage(updateChatConsumerDto);
  }
}
