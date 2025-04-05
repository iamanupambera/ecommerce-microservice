import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: object) {
    return this.sellerService.create(createSellerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: object) {
    return this.sellerService.update(id, updateSellerDto);
  }
}
