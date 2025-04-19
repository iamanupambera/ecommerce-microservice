import { Injectable } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';

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

  createGig(data: Prisma.GigCreateInput) {
    return this.dbWrite.prisma.gig.create({
      data: {
        ...data,
        ratingCategories: {
          create: {
            one: { create: {} },
            two: { create: {} },
            three: { create: {} },
            four: { create: {} },
            five: { create: {} },
          },
        },
      },
    });
  }

  async updateGig(
    gigId: string,
    gigData: Omit<Prisma.GigUpdateInput, 'gigActive'>,
  ) {
    return this.dbWrite.prisma.gig.update({
      where: { id: gigId },
      data: gigData,
    });
  }

  async updateActiveGigProp(gigId: string, gigActive: boolean) {
    return this.dbWrite.prisma.gig.update({
      where: { id: gigId },
      data: {
        active: gigActive,
      },
    });
  }

  async updateGigReview(data: {
    gigId: string;
    rating: keyof typeof ratingTypes;
  }) {
    const ratingKey = ratingTypes[data.rating];
    return this.dbWrite.prisma.gig.update({
      where: { id: data.gigId },
      data: {
        ratingsCount: { increment: 1 },
        ratingSum: { increment: +data.rating },
        ratingCategories: {
          update: {
            data: {
              [ratingKey]: {
                update: {
                  value: { increment: 1 },
                  count: {
                    increment: +data.rating,
                  },
                },
              },
            },
          },
        },
      },
    });

    // await updateIndexedData('gigs', `${gig._id}`, data);
  }

  async deleteGig(gigId: string) {
    await this.dbWrite.prisma.gig.delete({ where: { id: gigId } });
  }
}
