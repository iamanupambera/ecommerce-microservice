import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { SellerRepository } from './seller.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';

describe('SellerService', () => {
  let service: SellerService;

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
      ],
      providers: [SellerService, SellerRepository],
    }).compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
