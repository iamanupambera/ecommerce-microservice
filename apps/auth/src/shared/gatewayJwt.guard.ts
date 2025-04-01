import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GatewayJwtService } from 'src/modules/gatewayJwt/gatewayJwt.service';

@Injectable()
export class GatewayJwtGuard implements CanActivate {
  constructor(private readonly gatewayJwtService: GatewayJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToRpc().getData(); // Extract payload from the request

    const token = request?.serviceToken;
    if (!token) {
      throw new UnauthorizedException('Missing service token');
    }

    if (!(await this.gatewayJwtService.verifyToken(token))) {
      throw new UnauthorizedException('Invalid or expired service token');
    }

    return true;
  }
}
