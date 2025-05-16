import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversation/:senderUsername/:receiverUsername')
  getConversationListByParticipant(
    @Param('senderUsername') senderUsername: string,
    @Param('receiverUsername') receiverUsername: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.chatService.getConversationListByParticipant(
      senderUsername,
      receiverUsername,
      user,
    );
  }

  @Get('conversations/:username')
  getUserConversationList(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.chatService.getUserConversationList(username, user);
  }

  @Post('conversation')
  createConversation(
    @AuthUser() user: AuthJwtPayload,
    @Body() payload: object,
  ) {
    return this.chatService.createConversation(user, payload);
  }

  @Get(':senderUsername/:receiverUsername')
  getMessages(
    @Param('senderUsername') senderUsername: string,
    @Param('receiverUsername') receiverUsername: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.chatService.getMessages(senderUsername, receiverUsername, user);
  }

  @Get(':conversationId')
  getUserMessages(
    @Param('conversationId') conversationId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.chatService.getUserMessages(conversationId, user);
  }

  @Post()
  createMessage(@AuthUser() user: AuthJwtPayload, @Body() payload: object) {
    return this.chatService.createMessage(user, payload);
  }

  @Put('offer')
  updateOffer(@AuthUser() user: AuthJwtPayload, @Body() payload: object) {
    return this.chatService.updateOffer(user, payload);
  }

  @Put('mark-as-read')
  markMessageAsRead(@AuthUser() user: AuthJwtPayload, @Body() payload: object) {
    return this.chatService.markMessageAsRead(user, payload);
  }

  @Put('mark-multiple-as-read')
  markMessagesAsRead(
    @AuthUser() user: AuthJwtPayload,
    @Body() payload: object,
  ) {
    return this.chatService.markMessagesAsRead(user, payload);
  }
}
