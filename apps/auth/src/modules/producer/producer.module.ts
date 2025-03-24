import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { LoggerModule } from '@repo/modules/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.registerAsync({
      imports: [ConfigModule],
      injects: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
        name: 'auth',
        level: 'debug',
      }),
    }),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
