import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {
  AuthJwtPayload,
  LoggerService,
  RedisService,
} from '@repo/modules/index';
import { StoresService } from '../stores/stores.service';
import { JwtService } from '@nestjs/jwt';
import { Server, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { UseFilters } from '@nestjs/common';
import { WebSocketExceptionFilter } from 'src/shared/filters/ws-validation.filter';
import { GatewayCacheService } from '../gatewayCache/gatewayCache.service';

@UseFilters(new WebSocketExceptionFilter())
@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
})
export class WebsocketClientGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly logger: LoggerService,
    private readonly storesService: StoresService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly gatewayCacheService: GatewayCacheService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('info', 'WebSocket server initialized');
  }

  async handleConnection(client: WebSocket, request: IncomingMessage) {
    try {
      const authHeader = request.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Missing or invalid authorization header');
      }

      const token = authHeader.split('Bearer ')[1];
      if (!token) {
        throw new Error('Missing token');
      }

      const data = this.jwtService.verify<AuthJwtPayload>(token);
      if (!data) {
        throw new Error('Invalid token');
      }

      const storedOtp = await this.redisService.redis.get(
        `session:${data.id}:${data.sessionId}`,
      );

      if (!storedOtp || storedOtp !== data.otp) {
        throw new Error('Session validation failed');
      }

      this.logger.log('info', `Client id: ${client} connected`);
      client.send(
        JSON.stringify({ message: 'Welcome to the WebSocket server!' }),
      );

      this.storesService.addClient(client, data);
      const response = await this.gatewayCacheService.saveLoggedInUserToCache(
        'loggedInUsers',
        data.username,
      );
      this.broadcast('online', response);
    } catch (error: any) {
      client.close(1008, error?.message);
    }
  }

  async handleDisconnect(client: WebSocket) {
    this.logger.log('info', `Client disconnected`);
    const data = this.storesService.removeClient(client);
    const response = await this.gatewayCacheService.removeLoggedInUserFromCache(
      'loggedInUsers',
      data?.username,
    );

    this.broadcast('online', response);
  }

  @SubscribeMessage('getLoggedInUsers')
  async loginUserDetailsHandler(): Promise<WsResponse<{ response: string[] }>> {
    const response =
      await this.gatewayCacheService.getLoggedInUsersFromCache('loggedInUsers');

    return {
      event: 'online',
      data: { response },
    };
  }

  // @SubscribeMessage('chat')
  // @UsePipes(new WsValidationPipe())
  // chatHandler(
  //   client: WebSocket,
  //   @MessageBody() payload: ChatMessageDto,
  // ): WsResponse<number> {
  //   this.logger.log('info', `Message received from client id: ${client}`);
  //   console.log(payload);
  //   this.logger.log('info', `Payload: ${payload}`);
  //   return { event: 'events', data: 1 };
  // }

  broadcast<T>(event: string, response: T) {
    this.server.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ event, data: { response } }));
      }
    });
  }
}
