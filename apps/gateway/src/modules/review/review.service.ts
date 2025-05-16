import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { catchError, map } from 'rxjs';
const controller = 'review';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_SERVICE') private readonly reviewService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async create(payload: object, user: AuthJwtPayload, userToken: string) {
    return this.reviewService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'create' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('REVIEW'),
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

  async reviewsByGigId(user: AuthJwtPayload, userToken: string, gigId: string) {
    return this.reviewService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'reviewsByGigId' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('REVIEW'),
          payload: { gigId },
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

  async reviewsBySellerId(
    user: AuthJwtPayload,
    userToken: string,
    sellerId: string,
  ) {
    return this.reviewService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'reviewsBySellerId' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('REVIEW'),
          payload: { sellerId },
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
