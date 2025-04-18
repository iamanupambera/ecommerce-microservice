import { Module, DynamicModule } from '@nestjs/common';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchService } from './search.service';

@Module({})
export class SearchModule {
  static register(index: string): DynamicModule {
    return {
      module: SearchModule,
      imports: [
        ElasticsearchModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            node: configService.getOrThrow('ELASTIC_SEARCH_URL'),
          }),
        }),
      ],
      providers: [
        {
          provide: SearchService,
          useFactory: (elasticsearchService) =>
            new SearchService(elasticsearchService, index),
          inject: [ElasticsearchService],
        },
      ],
      exports: [SearchService],
    };
  }
}
