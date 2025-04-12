import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';
import { CommonErrors } from '@repo/modules/index';

const ratingTypes = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
} as const;

@Injectable()
export class GigRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  async createGig(data: Prisma.GigCreateInput) {
    const createdGig = await this.dbWrite.prisma.gig.create({ data });
    if (!createdGig) {
      throw new InternalServerErrorException(CommonErrors.GigNotFound);
    }

    // await publishDirectMessage(
    //   'gigChannel',
    //   'jobber-seller-update',
    //   'user-seller',
    //   JSON.stringify({
    //     type: 'update-gig-count',
    //     gigSellerId: `${createdGig.sellerId}`,
    //     count: 1,
    //   }),
    //   'Details sent to users service.',
    // );

    // await addDataToIndex('gigs', `${createdGig._id}`, data);
    return createdGig;
  }

  async deleteGig(gigId: string, sellerId: string) {
    await this.dbWrite.prisma.gig.delete({ where: { id: gigId } });
    const data = {
      type: 'update-gig-count',
      gigSellerId: sellerId,
      count: -1,
    };
    console.log(data);

    // await publishDirectMessage(
    //   'gigChannel',
    //   'jobber-seller-update',
    //   'user-seller',
    //   JSON.stringify({
    //     type: 'update-gig-count',
    //     gigSellerId: sellerId,
    //     count: -1,
    //   }),
    //   'Details sent to users service.',
    // );
    // await deleteIndexedData('gigs', `${gigId}`);
  }

  async updateGig(
    gigId: string,
    gigData: Omit<Prisma.GigUpdateInput, 'gigActive'>,
  ) {
    const document = await this.dbWrite.prisma.gig.update({
      where: { id: gigId },
      data: gigData,
    });

    if (!document) {
      throw new InternalServerErrorException(CommonErrors.GigNotFound);
    }
    // await updateIndexedData('gigs', `${document._id}`, data);
    return document;
  }

  async updateActiveGigProp(gigId: string, gigActive: boolean) {
    const document = await this.dbWrite.prisma.gig.update({
      where: { id: gigId },
      data: {
        active: gigActive,
      },
    });

    if (!document) {
      throw new InternalServerErrorException(CommonErrors.GigNotFound);
    }

    // await updateIndexedData('gigs', `${document._id}`, data);
    return document;
  }

  async updateGigReview(data: {
    gigId: string;
    rating: keyof typeof ratingTypes;
  }) {
    const ratingKey = ratingTypes[data.rating];
    const gig = await this.dbWrite.prisma.gig.update({
      where: { id: data.gigId },
      data: {
        ratingsCount: { increment: 1 },
        ratingSum: { increment: +data.rating },
        [`ratingCategories.${ratingKey}.value`]: { increment: data.rating },
        [`ratingCategories.${ratingKey}.count`]: { increment: 1 },
      },
    });

    if (!gig) {
      throw new InternalServerErrorException(CommonErrors.GigNotFound);
    }

    // await updateIndexedData('gigs', `${gig._id}`, data);
  }
}
