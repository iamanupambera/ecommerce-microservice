import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceNameENUM } from '@repo/modules/index';

@Injectable()
export class GatewayJwtService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generate a JWT token with the provided payload and options.
   * @param serviceName - The name of the service (must be a valid value from ServiceNameENUM).
   * @param options - Optional JWT options like expiration.
   * @returns The generated JWT token as a string.
   */
  async generateToken(
    serviceName: keyof typeof ServiceNameENUM,
    options?: {
      expiresIn?: string | number;
    },
  ): Promise<string> {
    return this.jwtService.sign({ serviceName }, options);
  }
}
