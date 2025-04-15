import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { GigRepository } from './gig.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [PrismaModule, SearchModule.register('gig')],
  controllers: [GigController],
  providers: [GigService, GigRepository],
})
export class GigModule {}
