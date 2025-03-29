import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';
const controller = 'auth_controller';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
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
        { userToken: null, serviceToken: '', payload, user: null },
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
        { userToken: null, serviceToken: '', payload, user: null },
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
