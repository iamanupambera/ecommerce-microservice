import { Module } from '@nestjs/common';
import { PrismaReadService } from './prisma-read.service';
import { PrismaWriteService } from './prisma-write.service';
import { LoggerModule } from '@repo/modules/index';
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
  providers: [PrismaReadService, PrismaWriteService],
  exports: [PrismaReadService, PrismaWriteService],
})
export class PrismaModule {}
