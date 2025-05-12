import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { OrderRepository } from '../order/order.repository';
import { Prisma } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { AuthJwtPayload, LoggerService } from '@repo/modules/index';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    @Inject(forwardRef(() => OrderRepository))
    private readonly orderRepository: OrderRepository,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
    private readonly logger: LoggerService,
  ) {}

  async sendNotification(
    data: Prisma.NotificationCreateInput,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const notification =
      await this.notificationRepository.createNotification(data);
    const order = await this.orderRepository.getOrderByOrderId(
      notification.orderId,
    );

    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'order-consumer', cmd: 'sendOrderNotification' },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: { notification, order },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            NotificationService.name + ' service error at auth register',
            error,
          );
        },
      });

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

  async update(id: string, user: AuthJwtPayload, userToken: string) {
    const notification =
      await this.notificationRepository.markNotificationAsRead(id);

    const order = await this.orderRepository.getOrderByOrderId(
      notification.orderId,
    );

    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'order-consumer', cmd: 'sendOrderNotification' },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: { notification, order },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            NotificationService.name + ' service error at auth register',
            error,
          );
        },
      });
    return {
      statusCode: 200,
      response: notification,
      message: 'Notification updated successfully.',
    };
  }
}
