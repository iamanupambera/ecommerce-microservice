import { Injectable } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  createNotification(data: Prisma.NotificationCreateInput) {
    return this.dbWrite.prisma.notification.create({ data });
  }

  getNotificationsById(userId: string) {
    return this.dbRead.prisma.notification.findMany({
      where: { userTo: userId },
    });
  }

  async markNotificationAsRead(notificationId: string) {
    return this.dbWrite.prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
      },
    });
  }
}
