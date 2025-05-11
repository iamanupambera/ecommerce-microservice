import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BuyerRepository } from './buyer.repository';
import { CommonErrors } from '@repo/modules/index';
import {
  BuyerPurchasedGigUpdateDto,
  CreateBuyerDto,
} from '@repo/validator/index';

@Injectable()
export class BuyerService {
  constructor(private buyerRepository: BuyerRepository) {}

  async create({
    username,
    email,
    profilePicture,
    country,
    createdAt,
  }: CreateBuyerDto) {
    if (
      (await this.buyerRepository.getBuyerByEmail(email)) ||
      (await this.buyerRepository.getBuyerByUsername(username))
    ) {
      throw new ConflictException(CommonErrors.EmailOrUserNameAlreadyExist);
    }
    const buyer = await this.buyerRepository.createBuyer({
      username,
      email,
      profilePicture,
      country,
      createdAt,
    });

    return {
      statusCode: 201,
      response: buyer,
      message: 'Buyer created successfully',
    };
  }

  async getLoginUserBuyerDetails(email: string) {
    const buyer = await this.buyerRepository.getBuyerByEmail(email);

    if (!buyer) {
      throw new NotFoundException(CommonErrors.BuyerNotFound);
    }

    return {
      statusCode: 200,
      response: buyer,
      message: 'Buyer profile retrieved successfully',
    };
  }

  async findOne(username: string) {
    const buyer = await this.buyerRepository.getBuyerByUsername(username);

    if (!buyer) {
      throw new NotFoundException(CommonErrors.BuyerNotFound);
    }

    return {
      statusCode: 200,
      response: buyer,
      message: 'Buyer profile retrieved successfully',
    };
  }

  async purchasedGigs({
    buyerId,
    purchasedGigId,
    type,
  }: BuyerPurchasedGigUpdateDto) {
    const buyerExists = await this.buyerRepository.getBuyerById(buyerId);

    if (!buyerExists) {
      throw new NotFoundException(CommonErrors.BuyerNotFound);
    }

    const buyerPurchases =
      await this.buyerRepository.updateBuyerPurchasedGigsProp(
        buyerId,
        purchasedGigId,
        type,
      );

    return {
      statusCode: 200,
      response: buyerPurchases,
      message: 'Buyer purchases updated successfully',
    };
  }
}
