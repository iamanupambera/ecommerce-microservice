import { LoggerService } from '@repo/modules/index';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('AUTH_SERVICE_PORT');

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

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(port);
  const logger = app.get(LoggerService);
  logger.log('info', 'Auth server running');
}

bootstrap();
