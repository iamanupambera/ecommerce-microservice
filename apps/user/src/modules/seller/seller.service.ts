import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { SellerRepository } from './seller.repository';
import {
  ApproveOrderDto,
  CancelOrderDto,
  CreateOrderDto,
  GetReviewFromBuyerDto,
  SellerDto,
  UpdateGigsCountDto,
} from '@repo/validator/index';
import { AuthJwtPayload, CommonErrors } from '@repo/modules/index';

@Injectable()
export class SellerService {
  constructor(private sellerRepository: SellerRepository) {}

  async create(
    { languages, experience, education, certificates, ...seller }: SellerDto,
    { username, email }: AuthJwtPayload,
  ) {
    if (seller.email) {
      const existingSeller = await this.sellerRepository.getSellerByEmail(
        seller.email,
      );

      if (existingSeller) {
        throw new ConflictException(CommonErrors.SellerAlreadyExists);
      }
    }

    const createdSeller = await this.sellerRepository.createSeller(
      { ...seller, username, email },
      languages,
      experience,
      education,
      certificates,
    );

    return {
      statusCode: 201,
      response: createdSeller,
      message: 'Seller created successfully',
    };
  }

  async findAll(limit: number) {
    const sellers = await this.sellerRepository.getRandomSellers(limit);
    return {
      statusCode: 200,
      response: sellers,
      message: 'Random sellers retrieved successfully',
    };
  }

  async findOneById(id: string) {
    const seller = await this.sellerRepository.getSellerById(id);

    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    return {
      statusCode: 200,
      response: seller,
      message: 'Seller details retrieved successfully',
    };
  }

  async findOneByUsername(username: string) {
    const seller = await this.sellerRepository.getSellerByUsername(username);

    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    return {
      statusCode: 200,
      response: seller,
      message: 'Seller details retrieved successfully',
    };
  }

  async update(
    id: string,
    { languages, experience, education, certificates, ...seller }: SellerDto,
  ) {
    const existingSeller = await this.sellerRepository.getSellerById(id);
    if (!existingSeller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const updatedSeller = await this.sellerRepository.updateSellerById(
      id,
      seller,
      languages,
      experience,
      education,
      certificates,
    );

    return {
      statusCode: 200,
      response: updatedSeller,
      message: 'Seller updated successfully',
    };
  }

  async createOrder({ sellerId, ongoingJobs }: CreateOrderDto) {
    const seller = await this.sellerRepository.getSellerById(sellerId);
    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const newOrder = await this.sellerRepository.updateSellerOngoingJobsCount(
      sellerId,
      ongoingJobs,
    );

    return {
      statusCode: 200,
      response: newOrder,
      message: 'Order created successfully',
    };
  }

  async approveOrder({
    sellerId,
    ongoingJobs,
    completedJobs,
    totalEarnings,
    recentDelivery,
  }: ApproveOrderDto) {
    const seller = await this.sellerRepository.getSellerById(sellerId);
    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const updateOrder =
      await this.sellerRepository.updateSellerCompletedJobsProp({
        sellerId,
        ongoingJobs,
        completedJobs,
        totalEarnings,
        recentDelivery,
      });

    return {
      statusCode: 200,
      response: updateOrder,
      message: 'Order approved successfully',
    };
  }

  async updateGigsCount({ gigSellerId, count }: UpdateGigsCountDto) {
    const seller = await this.sellerRepository.getSellerById(gigSellerId);
    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const updateCount = await this.sellerRepository.updateTotalGigsCount(
      gigSellerId,
      count,
    );

    return {
      statusCode: 200,
      response: updateCount,
      message: 'Gig count updated successfully',
    };
  }

  async cancelOrder({ sellerId }: CancelOrderDto) {
    const seller = await this.sellerRepository.getSellerById(sellerId);
    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const cancelOrder =
      await this.sellerRepository.updateSellerCancelledJobs(sellerId);

    return {
      statusCode: 200,
      response: cancelOrder,
      message: 'Order cancelled successfully',
    };
  }

  async getReviewFromBuyer({ rating, sellerId }: GetReviewFromBuyerDto) {
    const seller = await this.sellerRepository.getSellerById(sellerId);
    if (!seller) {
      throw new NotFoundException(CommonErrors.SellerNotFound);
    }

    const newRating = await this.sellerRepository.updateSellerReview({
      rating,
      sellerId,
    });
    // // here add gig service to update get from buyer
    // 'update-gig',
    // JSON.stringify({ rating, sellerId }),

    return {
      statusCode: 200,
      response: newRating,
      message: 'Review updated successfully',
    };
  }
}
