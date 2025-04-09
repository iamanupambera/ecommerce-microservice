import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule, RedisModule } from '@repo/modules/index';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.registerAsync({
          imports: [ConfigModule],
          injects: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
            name: 'auth service',
            level: 'debug',
          }),
        }),
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
        ClientsModule.registerAsync([
          {
            name: 'USER_SERVICE',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.getOrThrow<string>('RABBITMQ_ENDPOINT')],
                queue: configService.getOrThrow<string>('USER_SERVICE_QUEUE'),
                queueOptions: {
                  durable: false,
                },
              },
            }),
          },
        ]),
        PrismaModule,
        RedisModule,
        GatewayJwtModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, AuthRepository],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
