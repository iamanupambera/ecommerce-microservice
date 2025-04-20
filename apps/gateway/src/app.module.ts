import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayJwtModule } from './modules/gatewayJwt/gatewayJwt.module';
import { GigModule } from './modules/gig/gig.module';
import { SellerModule } from './modules/seller/seller.module';
import { BuyerModule } from './modules/buyer/buyer.module';
import { LoggerModule } from '@repo/modules/index';

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
        name: 'gateway service',
        level: 'debug',
      }),
    }),
    GatewayJwtModule,
    AuthModule,
    GigModule,
    SellerModule,
    BuyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
