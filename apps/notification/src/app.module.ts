import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/index';
import { AuthEmailModule } from './auth-email/auth-email.module';
import { OrderEmailModule } from './order-email/order-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    LoggerModule.registerAsync({
      imports: [ConfigModule],
      injects: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
        name: 'notification service',
        level: 'debug',
      }),
    }),
    AuthEmailModule,
    OrderEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
