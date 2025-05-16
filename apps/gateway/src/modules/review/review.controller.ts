import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { BearerToken } from 'src/shared/decorators/bearer-token.decorator';
import { AuthJwtPayload } from '@repo/modules/index';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.reviewService.create(payload, user, userToken);
  }

  @Get('/gig/:gigId')
  reviewsByGigId(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('gigId') gigId: string,
  ) {
    return this.reviewService.reviewsByGigId(user, userToken, gigId);
  }

  @Get('/seller/:sellerId')
  reviewsBySellerId(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('sellerId') sellerId: string,
  ) {
    return this.reviewService.reviewsBySellerId(user, userToken, sellerId);
  }
}
