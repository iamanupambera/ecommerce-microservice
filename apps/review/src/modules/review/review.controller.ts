import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '@repo/validator/index';
import { AuthJwtPayload } from '@repo/modules/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';

@Controller()
@UseGuards(GatewayJwtGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern('createReview')
  create(
    @Payload() createReviewDto: CreateReviewDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.reviewService.create(createReviewDto, user, userToken);
  }

  @MessagePattern('reviewsByGigId')
  reviewsByGigId() {
    return this.reviewService.reviewsByGigId('');
  }

  @MessagePattern('reviewsBySellerId')
  reviewsBySellerId() {
    return this.reviewService.reviewsBySellerId('');
  }
}
