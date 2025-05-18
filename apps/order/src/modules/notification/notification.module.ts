import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationRepository } from './notification.repository';
import { OrderModule } from '../order/order.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => OrderModule),
    ClientsModule.registerAsync([
      {
        name: 'WS_GATEWAY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_ENDPOINT')],
            queue: configService.getOrThrow<string>('WS_GATEWAY_SERVICE_QUEUE'),
            queueOptions: {
              durable: false,
            },
            exchange: configService.getOrThrow('WS_GATEWAY_SERVICE_EXCHANGE'),
            exchangeType: 'fanout',
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_ENDPOINT')],
            queue: configService.getOrThrow<string>(
              'NOTIFICATION_SERVICE_QUEUE',
            ),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
