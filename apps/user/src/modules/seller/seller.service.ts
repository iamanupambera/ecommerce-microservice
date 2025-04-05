import { BadRequestException, Injectable } from '@nestjs/common';
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
}
