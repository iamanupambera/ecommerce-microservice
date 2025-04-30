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
  findSellerGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findSellerGigs(sellerId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('seller/pause/:sellerId')
  findSellerInactiveGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findSellerInactiveGigs(sellerId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('category/:username')
  findGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findGigsByCategory(username, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('top/:username')
  findTopRatedGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findTopRatedGigsByCategory(username, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('similar/:gigId')
  findMoreGigsLikeThis(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findMoreGigsLikeThis(gigId, user);
  }

  @Get('auth/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneWithLogin(@Param('id') id: string, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.findOne(id, user);
  }

  @Get(':id')
  findOneWithLoutogin(@Param('id') id: string) {
    return this.gigService.findOne(id, null);
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
  changeStatus(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
    @Body() body: object,
  ) {
    return this.gigService.changeStatus({ ...body, gigId }, user);
  }

  @Delete(':gigId')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('gigId') gigId: string, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.remove({ id: gigId }, user);
  }
}
