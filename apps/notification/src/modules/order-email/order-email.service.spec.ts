import { Test, TestingModule } from '@nestjs/testing';
import { OrderEmailService } from './order-email.service';

describe('OrderEmailService', () => {
  let service: OrderEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderEmailService],
    }).compile();

    service = module.get<OrderEmailService>(OrderEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
