import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SellerRepository } from './seller.repository';
import { SellerDto } from '@repo/validator/index';

@Injectable()
export class SellerService {
  constructor(private sellerRepository: SellerRepository) {}

  async create({
    languages,
    experience,
    education,
    certificates,
    ...seller
  }: SellerDto) {
    const checkIfSellerExist = await this.sellerRepository.getSellerByEmail(
      seller.email,
    );

    if (checkIfSellerExist) {
      throw new BadRequestException(
        'Seller already exist. Go to your account page to update.',
      );
    }

    const createdSeller = await this.sellerRepository.createSeller(
      seller,
      languages,
      experience,
      education,
      certificates,
    );

    return {
      statusCode: 201,
      response: createdSeller,
      message: 'Seller created successfully.',
    };
  }

  async findAll(limit: number) {
    const sellers = await this.sellerRepository.getRandomSellers(limit);
    return {
      statusCode: 200,
      response: sellers,
      message: 'Random sellers profile',
    };
  }

  async findOneById(id: string) {
    const seller = await this.sellerRepository.getSellerById(id);

    if (!seller) {
      throw new NotFoundException('seller not found');
    }

    return {
      statusCode: 200,
      response: seller,
      message: 'Seller profile details',
    };
  }

  async findOneByUsername(username: string) {
    const seller = await this.sellerRepository.getSellerByUsername(username);

    if (!seller) {
      throw new NotFoundException('seller not found');
    }

    return {
      statusCode: 200,
      response: seller,
      message: 'Seller profile details',
    };
  }

  async update(
    id: string,
    { languages, experience, education, certificates, ...seller }: SellerDto,
  ) {
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
      message: 'Seller created successfully.',
    };
  }

  async createOrder({ sellerId, ongoingJobs }) {
    const newOrder = await this.sellerRepository.updateSellerOngoingJobsCount(
      sellerId,
      ongoingJobs,
    );

    return {
      statusCode: 200,
      response: newOrder,
      message: 'order created successfully.',
    };
  }

  async approveOrder({
    sellerId,
    ongoingJobs,
    completedJobs,
    totalEarnings,
    recentDelivery,
  }) {
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
      message: 'order approve successfully.',
    };
  }

  async updateGigsCount({ gigSellerId, count }) {
    const updateCount = await this.sellerRepository.updateTotalGigsCount(
      `${gigSellerId}`,
      count,
    );

    return {
      statusCode: 200,
      response: updateCount,
      message: 'count update successfully.',
    };
  }

  async cancelOrder({ sellerId }) {
    const cancelOrder =
      await this.sellerRepository.updateSellerCancelledJobs(sellerId);

    return {
      statusCode: 200,
      response: cancelOrder,
      message: 'order cancel successfully.',
    };
  }

  async getReviewFromBuyer({ rating, sellerId }) {
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
      message: 'success',
    };
  }
}
