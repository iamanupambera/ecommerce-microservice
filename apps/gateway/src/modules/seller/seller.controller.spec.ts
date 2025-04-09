import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('SellerController', () => {
  let controller: SellerController;

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
      controllers: [SellerController],
      providers: [SellerService],
    }).compile();

    controller = module.get<SellerController>(SellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
