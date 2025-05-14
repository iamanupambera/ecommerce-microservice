import { Injectable } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  async addReview(data: Prisma.ReviewCreateInput) {
    return this.dbWrite.prisma.review.create({ data });
  }

  getReviewsByGigId(gigId: string) {
    return this.dbRead.prisma.review.findMany({
      where: { gigId },
    });
  }

  getReviewsBySellerId(sellerId: string) {
    return this.dbRead.prisma.review.findMany({
      where: { sellerId, reviewType: 'sellerReview' },
    });
  }
}
