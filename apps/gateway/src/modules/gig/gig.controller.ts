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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  ChangeGigStatusDto,
  CreateGigDto,
  UpdateGigDto,
} from '@repo/validator/index';

@ApiTags('Gig')
@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @ApiBody({ type: CreateGigDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new gig' })
  @ApiResponse({ status: 201, description: 'Gig created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or bad request.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createGigDto: object, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.create(createGigDto, user);
  }

  @ApiOperation({ summary: 'Search gigs with filters' })
  @ApiParam({ name: 'from', type: Number })
  @ApiParam({ name: 'size', type: Number })
  @ApiParam({ name: 'type', type: String })
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'delivery_time', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all gigs of a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Get('seller/:sellerId')
  findSellerGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findSellerGigs(sellerId, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get paused/inactive gigs of a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Get('seller/pause/:sellerId')
  findSellerInactiveGigs(
    @Param('sellerId') sellerId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findSellerInactiveGigs(sellerId, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get gigs by category for a specific user' })
  @ApiParam({ name: 'username', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Get('category/:username')
  findGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findGigsByCategory(username, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get top-rated gigs by category for a user' })
  @ApiParam({ name: 'username', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Get('top/:username')
  findTopRatedGigsByCategory(
    @Param('username') username: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findTopRatedGigsByCategory(username, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find similar gigs' })
  @ApiParam({ name: 'gigId', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Get('similar/:gigId')
  findMoreGigsLikeThis(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.findMoreGigsLikeThis(gigId, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get gig by ID with auth' })
  @ApiParam({ name: 'id', required: true })
  @Get('auth/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneWithLogin(@Param('id') id: string, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Get gig by ID without auth' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  findOneWithLoutogin(@Param('id') id: string) {
    return this.gigService.findOne(id, null);
  }

  @ApiBody({ type: UpdateGigDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update gig details' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateGigDto: object,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.gigService.update(id, updateGigDto, user);
  }

  @ApiBody({ type: ChangeGigStatusDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change gig status (active/inactive)' })
  @ApiParam({ name: 'gigId', required: true })
  @UseGuards(AuthGuard('jwt'))
  @Put('active/:gigId')
  changeStatus(
    @Param('gigId') gigId: string,
    @AuthUser() user: AuthJwtPayload,
    @Body() body: object,
  ) {
    return this.gigService.changeStatus({ ...body, gigId }, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a gig' })
  @ApiParam({ name: 'gigId', required: true })
  @Delete(':gigId')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('gigId') gigId: string, @AuthUser() user: AuthJwtPayload) {
    return this.gigService.remove({ id: gigId }, user);
  }
}
