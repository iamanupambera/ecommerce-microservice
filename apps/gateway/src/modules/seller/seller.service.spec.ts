import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('SellerService', () => {
  let service: SellerService;

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
      providers: [SellerService],
    }).compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
