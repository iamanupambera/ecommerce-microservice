import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderEmailService {
  create(createOrderEmailDto: object) {
    return 'This action adds a new orderEmail';
  }

  findAll() {
    return `This action returns all orderEmail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderEmail`;
  }

  update(id: number, updateOrderEmailDto: object) {
    return `This action updates a #${id} orderEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderEmail`;
  }
}
