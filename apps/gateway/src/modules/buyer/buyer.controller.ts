import { Controller, Get, Param } from '@nestjs/common';
import { BuyerService } from './buyer.service';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Get()
  getLoginUserBuyerDetails() {
    return this.buyerService.getLoginUserBuyerDetails({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyerService.findOne({ id });
  }
}
