import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailController } from './auth-email.controller';
import { AuthEmailService } from './auth-email.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../email/mail.module';

describe('AuthEmailController', () => {
  let controller: AuthEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), MailModule],
      controllers: [AuthEmailController],
      providers: [AuthEmailService],
    }).compile();

    controller = module.get<AuthEmailController>(AuthEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
