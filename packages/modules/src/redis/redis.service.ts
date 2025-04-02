import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public redis: Redis;
  private readonly logger: LoggerService;

  constructor(readonly configService: ConfigService) {
    const dbUrl = configService.getOrThrow('REDIS_HOST');

    this.redis = new Redis(dbUrl);
  }

  async onModuleDestroy() {
    try {
      await this.redis.quit();
    } catch (err) {
      this.logger.log('error', 'redis error on ModuleDestroy', err);
    }
  }
}
