import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';
import { CommonErrors } from '@repo/modules/index';

@Injectable()
export class BuyerRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  getBuyerByEmail(email: string) {
    return this.dbRead.prisma.buyer.findUnique({
      where: { email },
    });
  }

  getBuyerById(id: string) {
    return this.dbRead.prisma.buyer.findUnique({
      where: { id },
    });
  }

  getBuyerByUsername(username: string) {
    return this.dbRead.prisma.buyer.findUnique({
      where: { username },
    });
  }

  getRandomBuyers(size: number) {
    return this.dbRead.prisma.$runCommandRaw({
      aggregate: 'Buyer',
      pipeline: [{ $sample: { size } }],
      cursor: {},
    });
  }

  createBuyer(data: Prisma.BuyerCreateInput) {
    return this.dbWrite.prisma.buyer.create({ data });
  }

  updateBuyerIsSellerProp(email: string) {
    return this.dbWrite.prisma.buyer.update({
      where: { email },
      data: {
        isSeller: true,
      },
    });
  }

  async updateBuyerPurchasedGigsProp(
    buyerId: string,
    purchasedGigId: string,
    type: 'purchased-gigs' | 'remove-gigs',
  ) {
    if (type === 'purchased-gigs') {
      return this.dbWrite.prisma.buyer.update({
        where: { id: buyerId },
        data: {
          purchasedGigs: {
            push: purchasedGigId,
          },
        },
      });
    }

    const buyer = await this.dbRead.prisma.buyer.findUnique({
      where: { id: buyerId },
      select: { purchasedGigs: true },
    });

    if (!buyer) {
      throw new NotFoundException(CommonErrors.BuyerNotFound);
    }

    const updatedPurchasedGigs = buyer.purchasedGigs.filter(
      (gigId) => gigId !== purchasedGigId,
    );

    return this.dbWrite.prisma.buyer.update({
      where: { id: buyerId },
      data: {
        purchasedGigs: updatedPurchasedGigs,
      },
    });
  }
}
