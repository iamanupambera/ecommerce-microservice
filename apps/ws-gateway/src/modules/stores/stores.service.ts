import { Injectable } from '@nestjs/common';
import { AuthJwtPayload } from '@repo/modules/index';
import { WebSocket } from 'ws';

@Injectable()
export class StoresService {
  private readonly userStore = new Map<
    WebSocket,
    { details: AuthJwtPayload; channels: Set<string> }
  >();
  private readonly channelStore = new Map<string, Set<WebSocket>>();

  getUserChannels(client: WebSocket): Set<string> | undefined {
    return this.userStore.get(client)?.channels;
  }

  addClient(client: WebSocket, details: AuthJwtPayload) {
    if (!this.userStore.has(client)) {
      this.userStore.set(client, { channels: new Set(), details });
    }
  }

  addUserToChannel(client: WebSocket, channel: string): void {
    if (!this.userStore.has(client)) return;

    this.userStore.get(client)?.channels?.add(channel);

    if (!this.channelStore.has(channel)) {
      this.channelStore.set(channel, new Set());
    }
    this.channelStore.get(channel)?.add(client);
  }

  removeUserFromChannel(client: WebSocket, channel: string): void {
    this.userStore.get(client)?.channels?.delete(channel);
    if (this.userStore.get(client)?.channels?.size === 0) {
      this.userStore.delete(client);
    }

    this.channelStore.get(channel)?.delete(client);
    if (this.channelStore.get(channel)?.size === 0) {
      this.channelStore.delete(channel);
    }
  }

  getClientsInChannel(channel: string): Set<WebSocket> | undefined {
    return this.channelStore.get(channel);
  }

  removeClient(client: WebSocket) {
    const channels = this.userStore.get(client)?.channels;
    if (channels) {
      for (const channel of channels) {
        this.channelStore.get(channel)?.delete(client);
        if (this.channelStore.get(channel)?.size === 0) {
          this.channelStore.delete(channel);
        }
      }
    }

    const data = this.userStore.get(client)?.details;
    this.userStore.delete(client);

    return data;
  }

  getAllState() {
    return {
      userStore: this.userStore,
      channelStore: this.channelStore,
    };
  }
}
