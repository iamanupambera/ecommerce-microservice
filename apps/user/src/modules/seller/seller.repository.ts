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
export class SellerRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  getSellerById(id: string) {
    return this.dbRead.prisma.seller.findUnique({
      where: { id },
    });
  }

  getSellerByUsername(username: string) {
    return this.dbRead.prisma.seller.findUnique({
      where: { username },
    });
  }

  getSellerByEmail(email: string) {
    return this.dbRead.prisma.seller.findUnique({
      where: { email },
    });
  }

  async getRandomSellers(size: number) {
    return this.dbRead.prisma.$runCommandRaw({
      aggregate: 'Buyer',
      pipeline: [{ $sample: { size } }],
      cursor: {},
    });
  }

  async createSeller(
    sellerData: Prisma.SellerCreateInput,
    languages: Omit<Prisma.LanguageCreateInput, 'seller'>[],
    experiences: Omit<Prisma.ExperienceCreateInput, 'seller'>[],
    educations: Omit<Prisma.EducationCreateInput, 'seller'>[],
    certificates: Omit<Prisma.CertificateCreateInput, 'seller'>[],
  ) {
    return this.dbWrite.prisma.seller.create({
      data: {
        ...sellerData,
        ...(languages.length && {
          languages: { createMany: { data: languages } },
        }),
        experience: { createMany: { data: experiences } },
        education: { createMany: { data: educations } },
        ...(certificates.length && {
          certificate: {
            certificates: { createMany: { data: certificates } },
          },
        }),
      },
    });
  }

  async updateSellerById(
    id: string,
    sellerData: Prisma.SellerUpdateInput,
    languages: Omit<Prisma.LanguageCreateInput, 'seller'>[],
    experiences: Omit<Prisma.ExperienceCreateInput, 'seller'>[],
    educations: Omit<Prisma.EducationCreateInput, 'seller'>[],
    certificates: Omit<Prisma.CertificateCreateInput, 'seller'>[],
  ) {
    return this.dbWrite.prisma.seller.update({
      where: { id },
      data: {
        fullName: sellerData.fullName,
        profilePicture: sellerData.profilePicture,
        description: sellerData.description,
        country: sellerData.country,
        skills: sellerData.skills,
        bio: sellerData.bio,
        responseTime: sellerData.responseTime,
        socialLinks: sellerData.socialLinks,
        languages: {
          deleteMany: {},
          createMany: { data: languages },
        },
        experience: {
          deleteMany: {},
          createMany: { data: experiences },
        },
        education: {
          deleteMany: {},
          createMany: { data: educations },
        },
        certificates: {
          deleteMany: {},
          createMany: { data: certificates },
        },
      },
    });
  }

  async updateTotalGigsCount(id: string, count: number) {
    return this.dbWrite.prisma.seller.update({
      where: { id },
      data: { totalGigs: { increment: count } },
    });
  }

  async updateSellerOngoingJobsCount(id: string, count: number) {
    return this.dbWrite.prisma.seller.update({
      where: { id },
      data: { ongoingJobs: { increment: count } },
    });
  }

  async updateSellerCancelledJobs(id: string) {
    return this.dbWrite.prisma.seller.update({
      where: { id },
      data: { ongoingJobs: { decrement: 1 }, cancelledJobs: { increment: 1 } },
    });
  }

  async updateSellerCompletedJobsProp({
    sellerId,
    ongoingJobs,
    completedJobs,
    totalEarnings,
    recentDelivery,
  }: {
    sellerId: string;
    ongoingJobs: number;
    completedJobs: number;
    totalEarnings: number;
    recentDelivery: Date;
  }) {
    return this.dbWrite.prisma.seller.update({
      where: { id: sellerId },
      data: {
        ongoingJobs: { increment: ongoingJobs },
        completedJobs: { increment: completedJobs },
        totalEarnings: { increment: totalEarnings },
        recentDelivery: recentDelivery,
      },
    });
  }

  async updateSellerReview({
    rating,
    sellerId,
  }: {
    sellerId: string;
    rating: keyof typeof ratingTypes;
  }) {
    const ratingKey = ratingTypes[rating];
    return this.dbWrite.prisma.seller.update({
      where: { id: sellerId },
      data: {
        ratingsCount: 1,
        ratingSum: parseInt(rating, 10),
        [`ratingCategories.${ratingKey}.value`]: rating,
        [`ratingCategories.${ratingKey}.count`]: 1,
      },
    });
  }
}
