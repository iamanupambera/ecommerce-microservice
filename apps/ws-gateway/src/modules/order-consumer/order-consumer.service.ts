import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderConsumerService {
  create(createOrderConsumerDto: any) {
    return createOrderConsumerDto;
  }

  findAll() {
    return `This action returns all orderConsumer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderConsumer`;
  }

  update(id: number, updateOrderConsumerDto: any) {
    return updateOrderConsumerDto;
  }

  remove(id: number) {
    return `This action removes a #${id} orderConsumer`;
  }
}
