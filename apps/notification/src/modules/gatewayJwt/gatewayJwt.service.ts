import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceNameENUM } from '@repo/modules/index';

@Injectable()
export class GatewayJwtService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Verify a JWT token and return its payload.
   * @param token - The JWT token to verify.
   * @returns The decoded payload if the token is valid.
   * @throws An error if the token is invalid or expired.
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      const data = this.jwtService.verify<{
        serviceName: keyof typeof ServiceNameENUM;
      }>(token);

      return data.serviceName === 'NOTIFICATION';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
