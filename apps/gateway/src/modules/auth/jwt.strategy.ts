import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload } from '@repo/modules/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow('USER_JWT_SECRET'),
    });
  }

  async validate({ email, id, otp, sessionId, username }: AuthJwtPayload) {
    return {
      email,
      id,
      otp,
      sessionId,
      username,
    };
  }
}
