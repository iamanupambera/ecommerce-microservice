import { Injectable } from '@nestjs/common';
import type { Auth, Password, Prisma } from '@prisma/client';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import bcrypt from 'bcrypt';
const saltRounds = 8;

@Injectable()
export class AuthRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  async create({
    password,
    emailVerificationToken,
    ...user
  }: Prisma.AuthCreateInput &
    Omit<Prisma.VerifiedEmailCreateInput, 'auth'> & { password: string }) {
    const hash = await bcrypt.hash(password, saltRounds);
    return this.dbWrite.prisma.auth.create({
      data: {
        ...user,
        password: {
          create: { hash },
        },
        verifiedEmail: { create: { emailVerificationToken } },
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

  async isValidatePassword(
    user: Auth & { password: Password },
    password: string,
  ) {
    return bcrypt.compare(password, user.password.hash);
  }

  async findByUsername(username: string) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * WARNING: This function retrieves user information, including the password.
   * Use with extreme caution to avoid exposing sensitive information.
   *
   * @param where - Criteria to find the user (email, id, or username).
   * @returns The user object including the password field.
   */
  async getUserWithPassword(identifier: string) {
    return this.dbRead.prisma.auth.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
      include: {
        password: true,
      },
    });
  }

  async updateById(userId: number, updateData: Prisma.AuthUpdateInput) {
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

  async getAllUser() {
    return this.dbRead.prisma.auth.findMany({});
  }

  /**
   * @returns get all soft deleted user
   */
  async deleteUser() {
    return this.dbRead.prisma.auth.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });
  }

  async updateUserOTP(
    authId: number,
    otp: string,
    otpExpiration: Date,
    browserName: string,
    deviceType: string,
  ): Promise<void> {
    await this.dbWrite.prisma.auth.update({
      data: {
        otp: { update: { otp, expires: otpExpiration } },
        ...(browserName && { browserName }),
        ...(deviceType && { deviceType }),
      },
      where: { id: authId },
    });
  }
}
