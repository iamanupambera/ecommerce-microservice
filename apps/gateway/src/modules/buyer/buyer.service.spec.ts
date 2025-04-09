import { Test, TestingModule } from '@nestjs/testing';
import { BuyerService } from './buyer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('BuyerService', () => {
  let service: BuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        GatewayJwtModule,
        ClientsModule.registerAsync([
          {
            name: 'USER_SERVICE',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: '127.0.0.1',
                port: configService.getOrThrow<number>('USER_SERVICE_PORT'),
              },
            }),
          },
        ]),
      ],
      providers: [BuyerService],
    }).compile();

    service = module.get<BuyerService>(BuyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
