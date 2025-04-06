import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('gig/:from/:size/:type')
  findAll(
    @Param('from') from: number,
    @Param('size') size: string,
    @Param('type') type: string,
    @Query('query') searchQuery: string,
    @Query('delivery_time') deliveryTime: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    return this.searchService.findAll({
      searchQuery,
      deliveryTime,
      min: parseInt(minPrice),
      max: parseInt(maxPrice),
      pagination: { from, size: parseInt(size), type },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne({ id });
  }
}
