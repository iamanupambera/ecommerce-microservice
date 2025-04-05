import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@repo/modules/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SellerModule } from './modules/seller/seller.module';
import { BuyerModule } from './modules/buyer/buyer.module';

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
        name: 'user service',
        level: 'debug',
      }),
    }),
    SellerModule,
    BuyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
