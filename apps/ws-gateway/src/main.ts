import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ExceptionFilter,
  LoggerService,
  setupFanoutListener,
} from '@repo/modules/index';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });

  const configService = app.get(ConfigService);
  const logger = app.get(LoggerService);

  const port = configService.getOrThrow('WS_GATEWAY_SERVICE_PORT');
  const RMQUrl = configService.getOrThrow('RABBITMQ_ENDPOINT');
  const RMQQueue = configService.getOrThrow('WS_GATEWAY_SERVICE_QUEUE');
  const RMQExchange = configService.getOrThrow('WS_GATEWAY_SERVICE_EXCHANGE');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => new WsException(errors),
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  app.useWebSocketAdapter(new WsAdapter(app));

  const { channel, connection } = await setupFanoutListener(
    RMQUrl,
    RMQExchange,
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQUrl],
        queue: RMQQueue,
        queueOptions: {
          durable: false,
          autoDelete: false,
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  channel.bindQueue(RMQQueue, RMQExchange, '');
  await app.listen(port);
  logger.log('info', 'WS-Gateway server running');

  // Enable shutdown hooks
  app.enableShutdownHooks();

  // Graceful shutdown handling
  app
    .getHttpAdapter()
    .getInstance()
    .on('close', async () => {
      logger.log(
        'info',
        'Closing RabbitMQ channel and WebSocket connections...',
      );
      await channel.close();
      await connection.close(); // Also close the RabbitMQ connection
      logger.log('info', 'Shutdown completed');
    });
}
bootstrap();
