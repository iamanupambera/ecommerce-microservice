import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthJwtPayload } from '@repo/modules/index';
import { Response } from 'express';
import { catchError, map } from 'rxjs';
import { GatewayJwtService } from 'src/modules/gatewayJwt/gatewayJwt.service';
const controller = 'auth_controller';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async register(payload: object, res: Response) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'register' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response: any) => {
          const {
            response: { token },
          } = response;
          if (token.refreshToken) {
            res.cookie('refreshToken', token.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
            });
          }

          response.response.token.refreshToken = undefined;
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async login(payload: object, res: Response) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'login' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response: any) => {
          const {
            response: { token },
          } = response;
          if (token.refreshToken) {
            res.cookie('refreshToken', token.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
            });
          }

          response.response.token.refreshToken = undefined;
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getLoginUser(user: AuthJwtPayload, userToken: string) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getLoginUser' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload: null,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getRefreshToken(res: Response, token: string) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getRefreshToken' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload: { token },
          user: null,
        },
      )
      .pipe(
        map((response: any) => {
          const {
            response: { token },
          } = response;
          if (token.refreshToken) {
            res.cookie('refreshToken', token.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
            });
          }

          response.response.token.refreshToken = undefined;
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async changePassword(payload: object, user: AuthJwtPayload) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'changePassword' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async verifyEmail(payload: object) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'verifyEmail' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async verifyOTP(payload: object, res: Response) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'verifyOtp' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response: any) => {
          const {
            response: { token },
          } = response;
          if (token.refreshToken) {
            res.cookie('refreshToken', token.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
            });
          }

          response.response.token.refreshToken = undefined;
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async resendVerifyEmail() {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'resendVerifyEmail' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload: null,
          user: null,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async forgotPassword(payload: object) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'forgotPassword' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async resetPassword(payload: object) {
    return this.authService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'resetPassword' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('AUTH'),
          payload,
          user: null,
        },
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }
}
