import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {
  AuthJwtPayload,
  CommonErrors,
  RedisService,
} from '@repo/modules/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow('USER_JWT_SECRET'),
    });
  }

  async validate({ email, id, otp, sessionId, username }: AuthJwtPayload) {
    const storedOtp = await this.redisService.redis.get(
      `session:${id}:${sessionId}`,
    );

    if (!storedOtp) {
      throw new UnauthorizedException(CommonErrors.UserSessionExpire);
    }

    if (storedOtp !== otp) {
      throw new UnauthorizedException(CommonErrors.UserSessionExpire);
    }

    return {
      email,
      id,
      otp,
      sessionId,
      username,
    };
  }
}
