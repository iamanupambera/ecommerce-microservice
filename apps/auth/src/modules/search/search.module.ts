import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchRepository } from './search.repository';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.getOrThrow('ELASTIC_SEARCH_URL'),
      }),
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository],
})
export class SearchModule {}
