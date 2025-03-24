import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@repo/modules/logger/logger.service';
import { connect, Channel, ChannelModel } from 'amqplib';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private connection: ChannelModel;
  private channel: Channel;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {}
  async onModuleInit() {
    const rabbitMQUrl = this.configService.getOrThrow('RABBITMQ_ENDPOINT');

    this.loggerService.log('info', 'Connecting to RabbitMQ...');
    this.connection = await connect(rabbitMQUrl);
    this.channel = await this.connection.createChannel();

    this.loggerService.log(
      'info',
      'Producer Service: RabbitMQ connection established.',
    );
  }

  async sendMessage(
    exchange: string,
    routingKey: string,
    message: object | string,
  ) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }

    await this.channel.assertExchange(exchange, 'direct', { durable: true });
    const messageBuffer = Buffer.from(JSON.stringify(message));

    this.channel.publish(exchange, routingKey, messageBuffer);
    this.loggerService.log(
      'info',
      `Message sent to exchange '${exchange}' with routing key '${routingKey}':`,
      message,
    );
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    this.loggerService.log('info', 'RabbitMQ connection closed.');
  }
}
