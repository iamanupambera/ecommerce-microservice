import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { OrderRepository } from '../order/order.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async sendNotification(data: Prisma.NotificationCreateInput) {
    const notification =
      await this.notificationRepository.createNotification(data);
    // socketIOOrderObject.emit('order notification', notification);
    return {
      statusCode: 201,
      response: notification,
      message: 'Notification send successfully.',
    };
  }

  async findAll(userId: string) {
    const notifications =
      await this.notificationRepository.getNotificationsById(userId);
    return {
      statusCode: 200,
      response: notifications,
      message: 'All Notifications',
    };
  }

  async update(id: string) {
    const notification =
      await this.notificationRepository.markNotificationAsRead(id);

    await this.orderRepository.getOrderByOrderId(notification.orderId);
    // socketIOOrderObject.emit('order notification', order, notification);
    return {
      statusCode: 200,
      response: notification,
      message: 'Notification updated successfully.',
    };
  }
}
