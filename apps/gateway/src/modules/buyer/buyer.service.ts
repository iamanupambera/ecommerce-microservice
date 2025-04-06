import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { catchError, map } from 'rxjs';
import { AuthJwtPayload } from '@repo/modules/index';
const controller = 'buyer';

@Injectable()
export class BuyerService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async getLoginUserBuyerDetails(payload: object, user: AuthJwtPayload) {
    return this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getLoginUserBuyerDetails' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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

  async findOne(payload: object, user: AuthJwtPayload) {
    return this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'findOne' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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
}
