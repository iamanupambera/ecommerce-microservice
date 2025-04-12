import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@repo/modules/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GigModule } from './modules/gig/gig.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    LoggerModule.registerAsync({
      imports: [ConfigModule],
      injects: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionUrl: configService.getOrThrow('ELASTIC_SEARCH_URL'),
        name: 'gig service',
        level: 'debug',
      }),
    }),
    GigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
