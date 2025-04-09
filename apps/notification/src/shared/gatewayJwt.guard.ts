import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GatewayJwtService } from '../modules/gatewayJwt/gatewayJwt.service';
import { CommonErrors } from '@repo/modules/index';

@Injectable()
export class GatewayJwtGuard implements CanActivate {
  constructor(private readonly gatewayJwtService: GatewayJwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToRpc().getData(); // Extract payload from the request

    const token = request?.serviceToken;
    if (!token) {
      throw new UnauthorizedException(CommonErrors.MissingServiceToken);
    }

    try {
      const isValid = await this.gatewayJwtService.verifyToken(token);
      if (!isValid) {
        throw new UnauthorizedException(CommonErrors.InvalidServiceToken);
      }
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Handle specific JWT verification errors if needed
      throw new UnauthorizedException(CommonErrors.InvalidServiceToken);
    }
  }
}
