import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayJwtModule } from './modules/gatewayJwt/gatewayJwt.module';
import { SearchModule } from './modules/search/search.module';
import { SellerModule } from './modules/seller/seller.module';
import { BuyerModule } from './modules/buyer/buyer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    GatewayJwtModule,
    AuthModule,
    SearchModule,
    SellerModule,
    BuyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
