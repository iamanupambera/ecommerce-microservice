import { Test, TestingModule } from '@nestjs/testing';
import { OrderConsumerService } from './order-consumer.service';

describe('OrderConsumerService', () => {
  let service: OrderConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderConsumerService],
    }).compile();

    service = module.get<OrderConsumerService>(OrderConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
