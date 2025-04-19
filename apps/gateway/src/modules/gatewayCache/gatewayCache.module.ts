import { Module } from '@nestjs/common';
import { GatewayCacheService } from './gatewayCache.service';
import { RedisModule } from '@repo/modules/index';

@Module({
  imports: [RedisModule],
  providers: [GatewayCacheService],
  exports: [GatewayCacheService],
})
export class GatewayCacheModule {}
