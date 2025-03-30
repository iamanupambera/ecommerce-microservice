import { GatewayJwtService } from './gatewayJwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('GATEWAY_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('GATEWAY_JWT_EXPIRATION'),
        },
      }),
    }),
  ],
  providers: [GatewayJwtService],
  exports: [GatewayJwtService],
})
export class GatewayJwtModule {}
