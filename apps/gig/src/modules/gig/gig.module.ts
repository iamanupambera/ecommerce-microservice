import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { GigRepository } from './gig.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';
import { GatewayJwtModule } from '../gatewayJwt/gatewayJwt.module';
import { RedisModule } from '@repo/modules/index';

@Module({
  imports: [
    PrismaModule,
    SearchModule.register('gig'),
    GatewayJwtModule,
    RedisModule,
  ],
  controllers: [GigController],
  providers: [GigService, GigRepository],
})
export class GigModule {}
