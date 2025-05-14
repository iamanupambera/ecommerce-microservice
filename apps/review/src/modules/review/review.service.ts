import { Inject, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from '@repo/validator/index';
import { ClientProxy } from '@nestjs/microservices';
import { AuthJwtPayload, LoggerService } from '@repo/modules/index';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    @Inject('ORDER_SERVICE')
    private readonly notificationService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
    private readonly logger: LoggerService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const review = await this.reviewRepository.addReview(createReviewDto);

    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'order', cmd: 'updateOrderReview' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
          payload: {
            gigId: review.gigId,
            reviewerId: review.reviewerId,
            sellerId: review.sellerId,
            review: review.review,
            rating: review.rating,
            orderId: review.orderId,
            createdAt: `${review.createdAt}`,
            type: `${review.reviewType}`,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            ReviewService.name + ' service error at create review',
            error,
          );
        },
      });
    return {
      statusCode: 201,
      response: review,
      message: 'Review created successfully.',
    };
  }

  async reviewsByGigId(gigId: string) {
    const reviews = await this.reviewRepository.getReviewsByGigId(gigId);
    return {
      statusCode: 200,
      response: reviews,
      message: 'Gig reviews by gig id',
    };
  }

  async reviewsBySellerId(sellerId: string) {
    const reviews = await this.reviewRepository.getReviewsBySellerId(sellerId);
    return {
      statusCode: 200,
      response: reviews,
      message: 'Gig reviews by seller id',
    };
  }
}
