import { Test, TestingModule } from '@nestjs/testing';
import { OrderEmailController } from './order-email.controller';
import { OrderEmailService } from './order-email.service';

describe('OrderEmailController', () => {
  let controller: OrderEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderEmailController],
      providers: [OrderEmailService],
    }).compile();

    controller = module.get<OrderEmailController>(OrderEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
