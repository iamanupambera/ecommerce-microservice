import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailService } from './auth-email.service';
import { MailModule } from '../email/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';

describe('AuthEmailService', () => {
  let service: AuthEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule.registerAsync({
          imports: [ConfigModule],
          injects: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
            name: 'notification service',
            level: 'debug',
          }),
        }),
        MailModule,
      ],
      providers: [AuthEmailService],
    }).compile();

    service = module.get<AuthEmailService>(AuthEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
