import { Test, TestingModule } from '@nestjs/testing';
import { BuyerService } from './buyer.service';
import { BuyerRepository } from './buyer.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';

describe('BuyerService', () => {
  let service: BuyerService;

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
      providers: [BuyerService, BuyerRepository],
    }).compile();

    service = module.get<BuyerService>(BuyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
