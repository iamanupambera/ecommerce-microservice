import { Injectable } from '@nestjs/common';
import winston from 'winston';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: winston.Logger) {}

  log(level: 'info' | 'error' | 'warn', message: string, error?: any) {
    this.logger.log(level, message, error ? { error } : undefined);
  }

  info(message: string, error?: any) {
    this.log('info', message, error);
  }

  error(message: string, error?: any) {
    this.log('error', message, error);
  }

  warn(message: string, error?: any) {
    this.log('warn', message, error);
  }
}
