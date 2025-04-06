import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailController } from './auth-email.controller';
import { AuthEmailService } from './auth-email.service';

describe('AuthEmailController', () => {
  let controller: AuthEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthEmailController],
      providers: [AuthEmailService],
    }).compile();

    controller = module.get<AuthEmailController>(AuthEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
