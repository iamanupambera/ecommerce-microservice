import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';
import { PaginationParams } from './types/search.types';

@Injectable()
export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async findAll(
    searchQuery: string,
    pagination: PaginationParams,
    deliveryTime?: string,
    min?: number,
    max?: number,
  ) {
    const result = await this.searchRepository.searchGigs({
      searchQuery,
      pagination,
      filters: {
        deliveryTime,
        minPrice: min,
        maxPrice: max,
      },
    });

    return {
      statusCode: 200,
      response: { data: result.hits, total: result.total },
      message: 'GIGs retrieved successfully',
    };
  }

  async findOne(id: string) {
    const gig = await this.searchRepository.getGigById(id);

    if (!gig) {
      return {
        statusCode: 404,
        message: 'GIG not found',
      };
    }

    return {
      statusCode: 200,
      message: 'GIG details retrieved successfully',
      response: gig,
    };
  }
}
