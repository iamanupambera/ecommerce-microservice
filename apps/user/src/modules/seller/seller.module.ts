import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SellerRepository } from './seller.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
