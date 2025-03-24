import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
} from 'winston-elasticsearch';
import { LoggerService } from './logger.service';
import { LoggerModuleOptions } from './logger.interface';
import winston from 'winston';

@Module({})
export class LoggerModule {
  static registerAsync(options: {
    useFactory: (...args: any[]) => LoggerModuleOptions;
    imports?: any[];
    injects?: any[];
  }): DynamicModule {
    const asyncProvider: Provider = {
      provide: LoggerService,
      useFactory: async (...args: any[]) => {
        const { connectionUrl, name, level } = options.useFactory(...args);

        const logger = winston.createLogger({
          exitOnError: false,
          defaultMeta: { service: name },
          transports: [
            new winston.transports.Console({
              level,
              handleExceptions: true,
            }),
            new ElasticsearchTransport({
              level,
              transformer: (logData) => {
                return ElasticsearchTransformer(logData);
              },
              clientOpts: {
                node: connectionUrl,
                maxRetries: 2,
                requestTimeout: 10000,
                sniffOnStart: false,
              },
            }),
          ],
        });

        return new LoggerService(logger);
      },
      inject: options.injects || [],
    };

    return {
      module: LoggerModule,
      imports: options.imports || [],
      providers: [asyncProvider],
      exports: [LoggerService],
    };
  }
}
