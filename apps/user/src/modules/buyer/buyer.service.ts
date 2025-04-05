import { BadRequestException, Injectable } from '@nestjs/common';
import { BuyerRepository } from './buyer.repository';
import { CommonErrors } from '@repo/modules/index';

@Injectable()
export class BuyerService {
  constructor(private buyerRepository: BuyerRepository) {}

  async create({ username, email, profilePicture, country, createdAt }) {
    if (
      (await this.buyerRepository.getBuyerByEmail(email)) ||
      (await this.buyerRepository.getBuyerByUsername(username))
    ) {
      throw new BadRequestException(CommonErrors.UserAlreadyExists);
    }
    const buyer = await this.buyerRepository.createBuyer({
      username,
      email,
      profilePicture,
      country,
      createdAt,
    });

    return {
      statusCode: 200,
      response: buyer,
      message: 'Buyer profile details',
    };
  }

  async getLoginUserBuyerDetails(email: string) {
    const buyer = await this.buyerRepository.getBuyerByEmail(email);
    return {
      statusCode: 200,
      response: buyer,
      message: 'Buyer profile details',
    };
  }

  async findOne(username: string) {
    const buyer = await this.buyerRepository.getBuyerByUsername(username);
    return {
      statusCode: 200,
      response: buyer,
      message: 'Buyer profile details',
    };
  }

  async buyerPurchasedGigs({ buyerId, purchasedGigs, type }) {
    const buyerPurchases =
      await this.buyerRepository.updateBuyerPurchasedGigsProp(
        buyerId,
        purchasedGigs,
        type,
      );

    return {
      statusCode: 200,
      response: buyerPurchases,
      message: 'Buyer profile details',
    };
  }
}
