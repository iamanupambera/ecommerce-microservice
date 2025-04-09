import { Test, TestingModule } from '@nestjs/testing';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { BuyerRepository } from './buyer.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('BuyerController', () => {
  let controller: BuyerController;

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
        PrismaModule,
        GatewayJwtModule,
      ],
      controllers: [BuyerController],
      providers: [BuyerService, BuyerRepository],
    }).compile();

    controller = module.get<BuyerController>(BuyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
