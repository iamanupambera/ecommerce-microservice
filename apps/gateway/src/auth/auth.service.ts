import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  async register(payload: object) {
    return this.authService.send<object, object>('register', payload).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        throw new HttpException(err.response, err.status, err.options);
      }),
    );
  }
}
