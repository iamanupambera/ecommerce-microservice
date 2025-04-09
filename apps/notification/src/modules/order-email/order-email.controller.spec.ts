import { Test, TestingModule } from '@nestjs/testing';
import { OrderEmailController } from './order-email.controller';
import { OrderEmailService } from './order-email.service';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';
import { ConfigModule } from '@nestjs/config';

describe('OrderEmailController', () => {
  let controller: OrderEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), GatewayJwtModule],
      controllers: [OrderEmailController],
      providers: [OrderEmailService],
    }).compile();

    controller = module.get<OrderEmailController>(OrderEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
