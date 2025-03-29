import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';
import { GatewayJwtService } from 'src/gatewayJwt/gatewayJwt.service';
const controller = 'auth_controller';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async register(payload: object) {
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
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async login(payload: object) {
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
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async getLoginUser(payload: object) {
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

  async getRefreshToken(payload: object) {
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

  async changePassword(payload: object) {
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

  async verifyOTP(payload: object) {
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
        map((response) => {
          return response;
        }),
        catchError((err) => {
          throw new HttpException(err.response, err.status, err.options);
        }),
      );
  }

  async resendVerifyEmail(payload: object) {
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
