import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
import {
  CreateConversationDto,
  CreateMessageDto,
  GetByIdDto,
  UpdateMessageDto,
  UpdateOffer,
} from '@repo/validator/index';
const controller = 'chat';

@Controller()
@UseGuards(GatewayJwtGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ controller, cmd: 'createConversation' })
  createConversation(@Payload('payload') body: CreateConversationDto) {
    return this.chatService.createConversation(body);
  }

  @MessagePattern({ controller, cmd: 'createMessage' })
  createMessage(@Payload('payload') createChatDto: CreateMessageDto) {
    return this.chatService.createMessage(createChatDto);
  }

  @MessagePattern({ controller, cmd: 'getConversationListByParticipant' })
  getConversationListByParticipant(
    @Payload('payload') body: CreateConversationDto,
  ) {
    return this.chatService.getConversationListByParticipant(body);
  }

  @MessagePattern({ controller, cmd: 'getMessages' })
  getMessages(@Payload('payload') body: CreateConversationDto) {
    return this.chatService.getMessages(body);
  }

  @MessagePattern({ controller, cmd: 'getUserConversationList' })
  getUserConversationList() {
    return this.chatService.getUserConversationList('');
  }

  @MessagePattern({ controller, cmd: 'getUserMessages' })
  getUserMessages(@Payload('payload') { id }: GetByIdDto) {
    return this.chatService.getUserMessages(id);
  }

  @MessagePattern({ controller, cmd: 'updateOffer' })
  updateOffer(@Payload('payload') body: UpdateOffer) {
    return this.chatService.updateOffer(body);
  }

  @MessagePattern({ controller, cmd: 'markMessagesAsRead' })
  markMessagesAsRead(@Payload('payload') body: UpdateMessageDto) {
    return this.chatService.markMessagesAsRead(body);
  }

  @MessagePattern({ controller, cmd: 'markMessageAsRead' })
  markMessageAsRead({ id }: GetByIdDto) {
    return this.chatService.markMessageAsRead(id);
  }
}
