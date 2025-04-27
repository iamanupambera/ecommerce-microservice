import { ExceptionFilter, LoggerService } from '@repo/modules/index';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('MESSAGE_SERVICE_PORT');
  const RMQUrl = configService.getOrThrow('RABBITMQ_ENDPOINT');
  const RMQQueue = configService.getOrThrow('MESSAGE_SERVICE_QUEUE');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port,
      },
    },
    { inheritAppConfig: true },
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
  await app.listen(4005);
  const logger = app.get(LoggerService);
  logger.log('info', 'Chat server running');
}

bootstrap();
