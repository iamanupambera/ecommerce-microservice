import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  QueryDslQueryContainer,
  Sort,
} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchService<TDocument = unknown> implements OnModuleInit {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly index: string,
  ) {}

  async onModuleInit() {
    const result = await this.elasticsearchService.indices.exists({
      index: this.index,
    });

    if (!result) {
      await this.elasticsearchService.indices.create({ index: this.index });
      await this.elasticsearchService.indices.refresh({ index: this.index });
    }
  }

  async getDocumentCount() {
    const { count } = await this.elasticsearchService.count({
      index: this.index,
    });
    return count;
  }

  async getIndexedData(itemId: string) {
    const result = await this.elasticsearchService.get<TDocument>({
      index: this.index,
      id: itemId,
    });
    return result._source;
  }

  async addDataToIndex(itemId: string, gigDocument: TDocument) {
    await this.elasticsearchService.index({
      index: this.index,
      id: itemId,
      document: gigDocument,
    });
  }

  async updateIndexedData(itemId: string, gigDocument: TDocument) {
    await this.elasticsearchService.update({
      index: this.index,
      id: itemId,
      doc: gigDocument,
    });
  }

  async deleteIndexedData(itemId: string) {
    await this.elasticsearchService.delete({
      index: this.index,
      id: itemId,
    });
  }

  async getIndexItemById(id: string) {
    const result = await this.elasticsearchService.get<TDocument>({
      index: this.index,
      id,
    });
    return result._source;
  }

  async searchIndexItem({
    query,
    size,
    sort,
  }: {
    query: QueryDslQueryContainer;
    size?: number;
    sort?: Sort;
  }) {
    return this.elasticsearchService.search<TDocument>({
      index: this.index,
      size,
      query,
      sort,
    });
  }
}
