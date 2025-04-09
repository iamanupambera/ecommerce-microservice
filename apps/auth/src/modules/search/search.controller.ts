import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { GatewayJwtGuard } from '../../shared/gatewayJwt.guard';
import { GigsSearchDto } from '@repo/validator/index';
const controller = 'search';

@Controller()
@UseGuards(GatewayJwtGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(
    @Payload('payload')
    payload: GigsSearchDto,
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
  findOne(@Payload('payload') id: string) {
    return this.searchService.findOne(id);
  }
}
