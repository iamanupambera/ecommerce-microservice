import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { AuthJwtPayload } from '@repo/modules/index';

@UseGuards(AuthGuard('jwt'))
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create')
  create(@Body() createSellerDto: object, @AuthUser() user: AuthJwtPayload) {
    return this.sellerService.create(createSellerDto, user);
  }

  @Get('random/:size')
  findAll(@AuthUser() user: AuthJwtPayload, @Param('size') size: number) {
    return this.sellerService.findAll({ size }, user);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string, @AuthUser() user: AuthJwtPayload) {
    return this.sellerService.findOneById({ id }, user);
  }

  @Get('username/:username')
  findOneByUsername(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.sellerService.findOneByUsername({ username }, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSellerDto: object,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.sellerService.update(id, updateSellerDto, user);
  }
}
