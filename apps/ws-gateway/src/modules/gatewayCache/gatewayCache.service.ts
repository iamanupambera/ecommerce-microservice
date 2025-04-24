import { Injectable } from '@nestjs/common';
import { LoggerService, RedisService } from '@repo/modules/index';

@Injectable()
export class GatewayCacheService {
  constructor(
    private readonly redisService: RedisService,
    private readonly logger: LoggerService,
  ) {}

  async saveLoggedInUserToCache(key: string, value: string) {
    try {
      const index = await this.redisService.redis.lpos(key, value);

      if (!index) {
        await this.redisService.redis.lpush(key, value);
        this.logger.info(`User ${value} added`);
      }

      const response = await this.redisService.redis.lrange(key, 0, -1);
      return response;
    } catch (error) {
      this.logger.log(
        'error',
        `${GatewayCacheService.name} saveLoggedInUserToCache() method error:`,
        error,
      );
    }
  }

  async getLoggedInUsersFromCache(key: string) {
    try {
      const response = await this.redisService.redis.lrange(key, 0, -1);
      return response;
    } catch (error) {
      this.logger.log(
        'error',
        `${GatewayCacheService.name} getLoggedInUsersFromCache() method error:`,
        error,
      );
    }
  }

  async removeLoggedInUserFromCache(key: string, value: string) {
    try {
      await this.redisService.redis.lrem(key, 1, value);
      this.logger.info(`User ${value} removed`);
      const response = await this.redisService.redis.lrange(key, 0, -1);
      return response;
    } catch (error) {
      this.logger.log(
        'error',
        `${GatewayCacheService.name} removeLoggedInUserFromCache() method error:`,
        error,
      );
    }
  }
}
