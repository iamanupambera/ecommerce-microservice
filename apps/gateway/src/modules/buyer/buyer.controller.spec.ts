import { Test, TestingModule } from '@nestjs/testing';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('BuyerController', () => {
  let controller: BuyerController;

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
      controllers: [BuyerController],
      providers: [BuyerService],
    }).compile();

    controller = module.get<BuyerController>(BuyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
