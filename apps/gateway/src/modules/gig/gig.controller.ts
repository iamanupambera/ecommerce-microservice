import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { GigService } from './gig.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { AuthJwtPayload } from '@repo/modules/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createGigDto: object, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.create(createGigDto, user);
  }

  @Get('search/:from/:size/:type')
  findAll(
    @Param('from') from: number,
    @Param('size') size: number,
    @Param('type') type: string,
    @Query('query') searchQuery: string,
    @Query('delivery_time') deliveryTime: string,
    @Query('minPrice') min: number,
    @Query('maxPrice') max: number,
  ) {
    return this.gigService.findAll({
      from,
      size,
      type,
      searchQuery,
      min,
      deliveryTime,
      max,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('seller/:sellerId')
  getSellerGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.getSellerGigs(sellerId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('seller/pause/:sellerId')
  getSellerPausedGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.getSellerPausedGigs(sellerId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('category/:username')
  getGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.getGigsByCategory(username, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('top/:username')
  getTopRatedGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.getTopRatedGigsByCategory(username, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('similar/:gigId')
  getMoreGigsLikeThis(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.getMoreGigsLikeThis(gigId, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gigService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateGigDto: object,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.update(id, updateGigDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('active/:gigId')
  gigChangeStatus(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.gigChangeStatus(gigId, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.remove(id, user);
  }
}
