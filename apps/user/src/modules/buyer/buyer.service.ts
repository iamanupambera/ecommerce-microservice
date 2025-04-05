import { Injectable } from '@nestjs/common';
import { BuyerRepository } from './buyer.repository';

@Injectable()
export class BuyerService {
  constructor(private buyerRepository: BuyerRepository) {}

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
}
