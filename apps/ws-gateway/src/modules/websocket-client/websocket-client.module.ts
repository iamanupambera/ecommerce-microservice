import { Module } from '@nestjs/common';
import { WebsocketClientGateway } from './websocket-client.gateway';
import { StoresModule } from '../stores/stores.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@repo/modules/index';
import { GatewayCacheModule } from '../gatewayCache/gatewayCache.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('USER_JWT_SECRET'),
      }),
    }),
    StoresModule,
    RedisModule,
    GatewayCacheModule,
  ],
  providers: [WebsocketClientGateway],
})
export class WebsocketClientModule {}
