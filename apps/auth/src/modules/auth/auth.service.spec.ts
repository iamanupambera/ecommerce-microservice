import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
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
        GatewayJwtModule,
      ],
      providers: [AuthService, AuthRepository],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
