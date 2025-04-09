import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '@repo/modules/index';
import { softDeleteMiddleware } from '../../shared/softDeleteMiddleware';

@Injectable()
export class PrismaReadService implements OnModuleInit, OnModuleDestroy {
  public prisma: PrismaClient;

  constructor(
    readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const dbUrl = configService.getOrThrow<string>('MYSQL_URL');

    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    }).$extends(softDeleteMiddleware) as unknown as PrismaClient;
  }

  async onModuleInit() {
    this.prisma.$connect();
  }

  async onModuleDestroy() {
    try {
      await this.prisma.$disconnect();
    } catch (error) {
      this.logger.log('error', PrismaReadService.name, error);
    }
  }
}
