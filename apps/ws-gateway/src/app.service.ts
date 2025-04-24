import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'WS-gateway service is healthy and OK.';
  }
}
