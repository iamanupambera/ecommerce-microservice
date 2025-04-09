import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerRepository } from './seller.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('SellerController', () => {
  let controller: SellerController;

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
      controllers: [SellerController],
      providers: [SellerService, SellerRepository],
    }).compile();

    controller = module.get<SellerController>(SellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
