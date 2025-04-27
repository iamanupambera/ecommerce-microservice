import { Injectable } from '@nestjs/common';
import { MessageEventDto } from '@repo/validator/index';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class ChatConsumerService {
  constructor(private readonly storesService: StoresService) {}

  createMessage(body: MessageEventDto) {
    const clients = this.storesService.getClientsInChannel(
      `conversation${body.conversationId}`,
    );
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ event: 'message received', data: { response: body } }),
      );
    });
    return {
      statusCode: 200,
      response: {},
      message: 'success',
    };
  }

  updateMessage(body: MessageEventDto) {
    const clients = this.storesService.getClientsInChannel(
      `conversation${body.conversationId}`,
    );
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ event: 'message update', data: { response: body } }),
      );
    });
    return {
      statusCode: 200,
      response: {},
      message: 'success',
    };
  }
}
