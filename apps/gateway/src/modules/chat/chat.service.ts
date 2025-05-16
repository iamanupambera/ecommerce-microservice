import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { catchError, map } from 'rxjs';
const controller = 'chat';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async getConversationListByParticipant(
    senderUsername: string,
    receiverUsername: string,
    user: AuthJwtPayload,
  ) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getConversationListByParticipant' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload: { senderUsername, receiverUsername },
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getUserConversationList(username: string, user: AuthJwtPayload) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getUserConversationList' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload: { username },
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async createConversation(user: AuthJwtPayload, payload: object) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'createConversation' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async createMessage(user: AuthJwtPayload, payload: object) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'createMessage' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getMessages(
    senderUsername: string,
    receiverUsername: string,
    user: AuthJwtPayload,
  ) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getMessages' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload: { senderUsername, receiverUsername },
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getUserMessages(id: string, user: AuthJwtPayload) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getUserMessages' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload: { id },
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async updateOffer(user: AuthJwtPayload, payload: object) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'updateOffer' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async markMessageAsRead(user: AuthJwtPayload, payload: object) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'markMessageAsRead' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async markMessagesAsRead(user: AuthJwtPayload, payload: object) {
    return this.chatService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'markMessagesAsRead' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('CHAT'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }
}
