import { Injectable } from '@nestjs/common';
import type { Auth, AuthPassword, Prisma } from '@prisma/client';
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
        authPassword: {
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

  async findByEmail(email: string, token = false, authOtp = false) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        email,
      },
      include: {
        resetPasswordRequest: token,
        authOtp,
      },
    });
  }

  async isValidatePassword(
    user: Auth & { authPassword: AuthPassword },
    password: string,
  ) {
    return bcrypt.compare(password, user.authPassword.hash);
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
        authPassword: true,
      },
    });
  }

  async delete(userId: number): Promise<Auth> {
    return this.dbWrite.prisma.auth.delete({
      where: { id: userId },
    });
  }

  async getAllUser() {
    return this.dbRead.prisma.auth.findMany();
  }

  /**
   * @returns get all soft deleted user
   */
  async getDeleteUser() {
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
        authOtp: { update: { otp, expires: otpExpiration } },
        ...(browserName && { browserName }),
        ...(deviceType && { deviceType }),
      },
      where: { id: authId },
    });
  }

  async updateVerifyEmailField(
    authId: number,
    data: { emailVerified: number; emailVerificationToken?: string },
  ) {
    return this.dbRead.prisma.auth.update({
      where: { id: authId },
      data: {
        verifiedEmail: {
          update: data,
        },
      },
    });
  }

  async updatePasswordToken(
    authId: number,
    token: string,
    tokenExpiration: Date,
  ) {
    return this.dbRead.prisma.auth.update({
      where: { id: authId },
      data: {
        resetPasswordRequest: {
          update: {
            token,
            expires: tokenExpiration,
          },
        },
      },
    });
  }

  async updatePassword(authId: number, password: string) {
    const hash = await bcrypt.hash(password, saltRounds);
    return this.dbRead.prisma.auth.update({
      where: { id: authId },
      data: {
        authPassword: { update: { hash } },
        resetPasswordRequest: {
          update: {
            token: '',
            expires: new Date(),
          },
        },
      },
    });
  }
}
