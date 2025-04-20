import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { GigRepository } from './gig.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';
import { RedisModule } from '@repo/modules/index';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    SearchModule.register({ index: 'gig' }),
    GatewayJwtModule,
    RedisModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_ENDPOINT')],
            queue: configService.getOrThrow('USER_SERVICE_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [GigController],
  providers: [GigService, GigRepository],
})
export class GigModule {}
