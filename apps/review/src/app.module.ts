import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@repo/modules/logger/logger.module';
import { ReviewModule } from './modules/review/review.module';
import { GatewayJwtModule } from './modules/gatewayJwt/gatewayJwt.module';

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
        name: 'review service',
        level: 'debug',
      }),
    }),
    GatewayJwtModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
