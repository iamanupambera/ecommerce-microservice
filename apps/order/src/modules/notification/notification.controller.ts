import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { AuthJwtPayload } from '@repo/modules/index';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('findAllNotification')
  findAll(@Payload('user') user: AuthJwtPayload) {
    return this.notificationService.findAll(user.username);
  }

  @MessagePattern('updateNotification')
  update(@Payload() updateNotificationDto: { id: string }) {
    return this.notificationService.update(updateNotificationDto.id);
  }
}
