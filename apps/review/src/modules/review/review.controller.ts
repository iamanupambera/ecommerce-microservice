import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '@repo/validator/index';
import { AuthJwtPayload } from '@repo/modules/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
const controller = 'review';

@Controller()
@UseGuards(GatewayJwtGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(
    @Payload() createReviewDto: CreateReviewDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.reviewService.create(createReviewDto, user, userToken);
  }

  @MessagePattern({ controller, cmd: 'reviewsByGigId' })
  reviewsByGigId(@Payload('payload') { gigId }: { gigId: string }) {
    return this.reviewService.reviewsByGigId(gigId);
  }

  @MessagePattern({ controller, cmd: 'reviewsBySellerId' })
  reviewsBySellerId(@Payload('payload') { sellerId }: { sellerId: string }) {
    return this.reviewService.reviewsBySellerId(sellerId);
  }
}
