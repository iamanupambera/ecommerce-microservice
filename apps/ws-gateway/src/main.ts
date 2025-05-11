import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionFilter, LoggerService } from '@repo/modules/index';
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

  await app.listen(port);
  logger.log('info', 'WS-Gateway server running');
}
bootstrap();
