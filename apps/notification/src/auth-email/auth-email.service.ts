import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEmailService {
  sendOtp(payload: object) {
    return payload;
  }
}
