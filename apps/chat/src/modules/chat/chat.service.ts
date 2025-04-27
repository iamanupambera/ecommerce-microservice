import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import {
  CreateConversationDto,
  CreateMessageDto,
  UpdateMessageDto,
  UpdateOffer,
} from '@repo/validator/index';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { LoggerService } from '@repo/modules/index';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly gatewayJwtService: GatewayJwtService,
    private readonly logger: LoggerService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
    @Inject('WS_GATEWAY_SERVICE')
    private readonly WSGatewayService: ClientProxy,
  ) {}

  async createConversation({
    receiverUsername,
    senderUsername,
  }: CreateConversationDto) {
    const conversation = await this.chatRepository.createConversation(
      senderUsername,
      receiverUsername,
    );

    return {
      statusCode: 201,
      response: conversation,
      message: 'Conversation create successfully',
    };
  }

  async createMessage({ conversationId, offer, ...message }: CreateMessageDto) {
    const messageData = await this.chatRepository.addMessage(
      message,
      conversationId,
      offer,
    );

    // if offer in this message then emit event to notification offer email
    if (messageData.hasOffer) {
      this.notificationService
        .send<
          object,
          {
            userToken: string;
            serviceToken: string;
            payload: object;
            user: object;
          }
        >(
          { controller: 'order_email_controller', cmd: 'sendOfferEmail' },
          {
            userToken: null,
            serviceToken:
              await this.gatewayJwtService.generateToken('NOTIFICATION'),
            payload: {
              sender: messageData.senderUsername,
              amount: offer.price,
              buyerUsername: messageData.receiverUsername,
              sellerUsername: messageData.senderUsername,
              title: offer.gigTitle,
              description: offer?.description,
              deliveryDays: offer?.deliveryInDays,
              offerLink: '',
              receiverEmail: 'anupam@pitangent.com',
            },
            user: null,
          },
        )
        .subscribe({
          error: (error) => {
            this.logger.log(
              'error',
              ChatService.name + ' service error at auth register',
              error,
            );
          },
        });
    }

    this.WSGatewayService.send<
      object,
      {
        userToken: string;
        serviceToken: string;
        payload: object;
        user: object;
      }
    >(
      { controller: 'chat_consumer', cmd: 'createMessage' },
      {
        userToken: null,
        serviceToken: '',
        payload: messageData,
        user: null,
      },
    ).subscribe({
      error: (error) => {
        this.logger.log(
          'error',
          ChatService.name + ' service error at auth register',
          error,
        );
      },
    });

    return {
      statusCode: 201,
      data: { conversationId, messageData },
      message: 'Message added',
    };
  }

  async getConversationListByParticipant({
    senderUsername,
    receiverUsername,
  }: CreateConversationDto) {
    const conversations =
      await this.chatRepository.getConversationListByParticipant(
        senderUsername,
        receiverUsername,
      );

    return {
      statusCode: 200,
      response: conversations,
      message: 'Chat conversation',
    };
  }

  async getMessages({
    senderUsername,
    receiverUsername,
  }: CreateConversationDto) {
    const messages = await this.chatRepository.getMessages(
      senderUsername,
      receiverUsername,
    );

    return { statusCode: 200, response: messages, message: 'Chat messages' };
  }

  async getUserConversationList(username: string) {
    const conversations =
      await this.chatRepository.getUserConversationList(username);

    return {
      statusCode: 200,
      response: conversations,
      message: 'Conversation list',
    };
  }

  async getUserMessages(conversationId: string) {
    const messages = await this.chatRepository.getUserMessages(conversationId);

    return {
      statusCode: 200,
      response: messages,
      message: 'Chat messages',
    };
  }

  async updateOffer({ messageId, type }: UpdateOffer) {
    const message = await this.chatRepository.updateOffer(messageId, type);
    return {
      statusCode: 200,
      response: message,
      message: 'Updated message successfully',
    };
  }

  async markMessagesAsRead({
    receiverUsername,
    senderUsername,
    messageId,
  }: UpdateMessageDto) {
    const message = await this.chatRepository.markMessagesAsRead(
      receiverUsername,
      senderUsername,
      messageId,
    );
    this.WSGatewayService.send<
      object,
      {
        userToken: string;
        serviceToken: string;
        payload: object;
        user: object;
      }
    >(
      { controller: 'chat_consumer', cmd: 'updateMessage' },
      {
        userToken: null,
        serviceToken: '',
        payload: message,
        user: null,
      },
    ).subscribe({
      error: (error) => {
        this.logger.log(
          'error',
          ChatService.name + ' service error at auth register',
          error,
        );
      },
    });

    return {
      statusCode: 200,
      response: message,
      message: 'Messages marked as read',
    };
  }

  async markMessageAsRead(messageId: string) {
    const message = await this.chatRepository.markMessageAsRead(messageId);
    this.WSGatewayService.send<
      object,
      {
        userToken: string;
        serviceToken: string;
        payload: object;
        user: object;
      }
    >(
      { controller: 'chat_consumer', cmd: 'updateMessage' },
      {
        userToken: null,
        serviceToken: '',
        payload: message,
        user: null,
      },
    ).subscribe({
      error: (error) => {
        this.logger.log(
          'error',
          ChatService.name + ' service error at auth register',
          error,
        );
      },
    });

    return {
      statusCode: 200,
      response: message,
      message: 'Message marked as read',
    };
  }
}
