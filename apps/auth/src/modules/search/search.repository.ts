import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';
import {
  SearchRequest,
  GetRequest,
  QueryDslQueryContainer,
  SortCombinations,
} from '@elastic/elasticsearch/lib/api/types';
import { ResponseError } from '@elastic/transport/lib/errors';
import { Gig } from './types/gig.interface';
import { SearchGigsParams } from './types/search.types';

@Injectable()
export class SearchRepository {
  private readonly index = 'gigs';
  private readonly searchFields = [
    'username',
    'title',
    'description',
    'basicDescription',
    'basicTitle',
    'categories',
    'subCategories',
    'tags',
  ];

  constructor(private readonly esService: ElasticsearchService) {}

  async getGigById(id: string): Promise<Gig | null> {
    try {
      const getRequest: GetRequest = {
        index: this.index,
        id,
      };
      const result = await this.esService.get<Gig>(getRequest);
      return result._source;
    } catch (error) {
      if (error instanceof ResponseError && error.meta.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async searchGigs(params: SearchGigsParams) {
    const {
      searchQuery,
      pagination,
      filters = {},
      sortField = 'sortId',
    } = params;
    const { from, size, type } = pagination;

    const mustQueries = this.buildMustQueries(searchQuery, filters);
    const sortDirection: SortCombinations = {
      [sortField]: type === 'forward' ? 'asc' : 'desc',
    };

    const searchBody: SearchRequest = {
      index: this.index,
      size,
      query: { bool: { must: mustQueries } },
      sort: [sortDirection],
      ...(from !== '0' && { search_after: [from] }),
    };

    const response = await this.esService.search<Gig>(searchBody);
    const hits = response.hits.hits.map((hit) => hit._source);

    return {
      total: response.hits.total as number,
      hits,
    };
  }

  private buildMustQueries(
    searchQuery: string,
    filters: SearchGigsParams['filters'],
  ): QueryDslQueryContainer[] {
    const mustQueries: QueryDslQueryContainer[] = [
      {
        query_string: {
          fields: this.searchFields,
          query: `*${searchQuery}*`,
        },
      },
      {
        term: {
          active: {
            value: true,
          },
        },
      },
    ];

    if (filters?.deliveryTime && filters.deliveryTime !== 'undefined') {
      mustQueries.push(this.createDeliveryTimeQuery(filters.deliveryTime));
    }

    if (this.hasValidPriceRange(filters)) {
      mustQueries.push(
        this.createPriceRangeQuery(filters.minPrice!, filters.maxPrice!),
      );
    }

    return mustQueries;
  }

  private createDeliveryTimeQuery(
    deliveryTime: string,
  ): QueryDslQueryContainer {
    return {
      query_string: {
        fields: ['expectedDelivery'],
        query: `*${deliveryTime}*`,
      },
    };
  }

  private hasValidPriceRange(filters?: {
    minPrice?: number;
    maxPrice?: number;
  }): boolean {
    return (
      filters !== undefined &&
      !isNaN(filters.minPrice!) &&
      !isNaN(filters.maxPrice!)
    );
  }

  private createPriceRangeQuery(
    minPrice: number,
    maxPrice: number,
  ): QueryDslQueryContainer {
    return {
      range: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    };
  }
}
