import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailController } from './auth-email.controller';
import { AuthEmailService } from './auth-email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '../email/mail.module';
import { LoggerModule } from '@repo/modules/index';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';

describe('AuthEmailController', () => {
  let controller: AuthEmailController;

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
        GatewayJwtModule,
        MailModule,
      ],
      controllers: [AuthEmailController],
      providers: [AuthEmailService],
    }).compile();

    controller = module.get<AuthEmailController>(AuthEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
