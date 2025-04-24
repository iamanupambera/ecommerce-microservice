import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatConsumerService {
  create(createChatConsumerDto: any) {
    return createChatConsumerDto;
  }

  findAll() {
    return `This action returns all chatConsumer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatConsumer`;
  }

  update(id: number, updateChatConsumerDto: any) {
    return updateChatConsumerDto;
  }

  remove(id: number) {
    return `This action removes a #${id} chatConsumer`;
  }
}
