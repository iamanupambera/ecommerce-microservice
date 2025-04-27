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

  async findByEmail(email: string) {
    return this.dbRead.prisma.auth.findUnique({
      where: {
        email,
      },
      include: {
        resetPasswordRequest: true,
        verifiedEmail: true,
        authOtp: true,
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

  updateUserById(id: number, data: Prisma.AuthUpdateInput) {
    return this.dbWrite.prisma.auth.update({ data, where: { id } });
  }

  async updateUserOTP(
    authId: number,
    otp: string,
    otpExpiration: Date,
    browserName: string,
    deviceType: string,
  ) {
    return this.dbWrite.prisma.auth.update({
      data: {
        authOtp: {
          upsert: {
            create: { otp, expires: otpExpiration },
            update: { otp, expires: otpExpiration },
          },
        },
        ...(browserName && { browserName }),
        ...(deviceType && { deviceType }),
      },
      where: { id: authId },
    });
  }

  deleteUserOtp(id: number) {
    return this.dbWrite.prisma.authOTP.delete({ where: { id } });
  }

  async updateVerifyEmailField(
    authId: number,
    emailVerified: boolean,
    data: { emailVerificationToken: string },
  ) {
    return this.dbRead.prisma.auth.update({
      where: { id: authId },
      data: {
        emailVerified,
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
          upsert: {
            create: {
              token,
              expires: tokenExpiration,
            },
            update: {
              token,
              expires: tokenExpiration,
            },
          },
        },
      },
    });
  }

  async updatePassword(
    authId: number,
    password: string,
    deletePasswordReset = false,
  ) {
    const hash = await bcrypt.hash(password, saltRounds);
    if (deletePasswordReset) {
      return this.dbRead.prisma.auth.update({
        where: { id: authId },
        data: {
          authPassword: { update: { hash } },
          resetPasswordRequest: {
            delete: true,
          },
        },
      });
    } else {
      return this.dbRead.prisma.auth.update({
        where: { id: authId },
        data: {
          authPassword: { update: { hash } },
        },
      });
    }
  }

  async createSession(
    authId: number,
    { accessToken, refreshToken }: Omit<Prisma.AuthSessionCreateInput, 'auth'>,
  ) {
    return this.dbWrite.prisma.authSession.create({
      data: { accessToken, refreshToken, authId },
    });
  }

  async updateSessionById(id: number, data: Prisma.AuthSessionUpdateInput) {
    return this.dbWrite.prisma.authSession.update({ data, where: { id } });
  }

  async deleteSessionById(id: number) {
    return this.dbWrite.prisma.authSession.delete({ where: { id } });
  }
}
