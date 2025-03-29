import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('USER_JWT_SECRET'),
      }),
    }),
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
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
