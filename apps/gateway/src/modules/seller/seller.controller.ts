import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create')
  create(@Body() createSellerDto: object) {
    return this.sellerService.create(createSellerDto);
  }

  @Get('random')
  findAll(@Body() createSellerDto: object) {
    return this.sellerService.findAll(createSellerDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOneById({ id });
  }

  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.sellerService.findOneByUsername({ username });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: object) {
    return this.sellerService.update(id, updateSellerDto);
  }
}
