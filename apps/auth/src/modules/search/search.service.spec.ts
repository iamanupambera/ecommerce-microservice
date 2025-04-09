import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { SearchRepository } from './search.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        ElasticsearchModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            node: configService.getOrThrow('ELASTIC_SEARCH_URL'),
          }),
        }),
      ],
      providers: [SearchService, SearchRepository],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
