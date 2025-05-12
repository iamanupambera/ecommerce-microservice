import { Injectable } from '@nestjs/common';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class OrderConsumerService {
  constructor(private readonly storesService: StoresService) {}

  sendOrderNotification(notification: { userTo: string }, order: object) {
    const client = this.storesService.getClientByDetails(notification.userTo);
    if (!client) {
      return;
    }

    client.send(
      JSON.stringify({
        event: 'order notification',
        data: { response: { notification, order } },
      }),
    );
  }
}
