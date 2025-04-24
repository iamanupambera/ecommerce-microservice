import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ChatConsumerService } from './chat-consumer.service';
const controller = 'chat_consumer';

@Controller()
export class ChatConsumerController {
  constructor(private readonly chatConsumerService: ChatConsumerService) {}

  @EventPattern({ controller, cmd: 'create' })
  create(@Payload() createChatConsumerDto: any) {
    return this.chatConsumerService.create(createChatConsumerDto);
  }

  @EventPattern({ controller, cmd: 'findAll' })
  findAll() {
    return this.chatConsumerService.findAll();
  }

  @EventPattern({ controller, cmd: 'findOne' })
  findOne(@Payload() id: number) {
    return this.chatConsumerService.findOne(id);
  }

  @EventPattern({ controller, cmd: 'update' })
  update(@Payload() updateChatConsumerDto: any) {
    return this.chatConsumerService.update(
      updateChatConsumerDto.id,
      updateChatConsumerDto,
    );
  }

  @EventPattern({ controller, cmd: 'remove' })
  remove(@Payload() id: number) {
    return this.chatConsumerService.remove(id);
  }
}
