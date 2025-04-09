import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        GatewayJwtModule,
        ClientsModule.registerAsync([
          {
            name: 'AUTH_SERVICE',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: '127.0.0.1',
                port: configService.getOrThrow<number>('AUTH_SERVICE_PORT'),
              },
            }),
          },
        ]),
      ],
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
