import { Injectable } from '@nestjs/common';
import type { Auth, Prisma } from '@prisma/client';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { RegisterDto } from '@repo/validator/index';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  create(user: Prisma.AuthCreateInput) {
    return this.dbWrite.prisma.auth.create({
      data: {
        ...user,
      },
    });
  }

  async findById(userId: number) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByIds(userIds: number[]) {
    return this.dbRead.prisma.auth.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        username,
      },
    });
  }

  async findByUsernameOrEmail(identifier: string) {
    return this.dbRead.prisma.auth.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  async updateById(userId: number, updateData: Partial<RegisterDto>) {
    return this.dbWrite.prisma.auth.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async updateByEmail(email: string, updateData: Prisma.AuthUpdateInput) {
    return this.dbWrite.prisma.auth.update({
      where: { email },
      data: updateData,
    });
  }

  async delete(userId: number): Promise<Auth> {
    return this.dbWrite.prisma.auth.delete({
      where: { id: userId },
    });
  }
}
