import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@repo/modules/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebsocketClientModule } from './modules/websocket-client/websocket-client.module';
import { ChatConsumerModule } from './modules/chat-consumer/chat-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    LoggerModule.registerAsync({
      imports: [ConfigModule],
      injects: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
        name: 'WS-Gateway service',
        level: 'debug',
      }),
    }),
    WebsocketClientModule,
    ChatConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
