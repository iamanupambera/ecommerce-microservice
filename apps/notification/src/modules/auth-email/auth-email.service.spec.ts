import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailService } from './auth-email.service';
import { MailModule } from '../email/mail.module';
import { ConfigModule } from '@nestjs/config';

describe('AuthEmailService', () => {
  let service: AuthEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule, ConfigModule.forRoot({})],
      providers: [AuthEmailService],
    }).compile();

    service = module.get<AuthEmailService>(AuthEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
