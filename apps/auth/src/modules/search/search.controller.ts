import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { PaginationParams } from './types/search.types';
const controller = 'search';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(
    @Payload()
    payload: {
      searchQuery: string;
      pagination: PaginationParams;
      deliveryTime?: string;
      min?: number;
      max?: number;
    },
  ) {
    return this.searchService.findAll(
      payload.searchQuery,
      payload.pagination,
      payload.deliveryTime,
      payload.min,
      payload.max,
    );
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload() id: string) {
    return this.searchService.findOne(id);
  }
}
