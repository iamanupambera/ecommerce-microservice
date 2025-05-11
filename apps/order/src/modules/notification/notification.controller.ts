import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
const controller = 'notification';

@Controller()
@UseGuards(GatewayJwtGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ controller, cmd: 'findAllNotification' })
  findAll(@Payload('user') user: AuthJwtPayload) {
    return this.notificationService.findAll(user.username);
  }

  @MessagePattern({ controller, cmd: 'updateNotification' })
  update(@Payload() updateNotificationDto: { id: string }) {
    return this.notificationService.update(updateNotificationDto.id);
  }
}
