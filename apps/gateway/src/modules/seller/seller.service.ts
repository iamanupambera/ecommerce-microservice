import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { catchError, map } from 'rxjs';
const controller = 'seller';

@Injectable()
export class SellerService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async create(payload: object) {
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
        { controller, cmd: 'create' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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

  async findAll(payload: object) {
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
        { controller, cmd: 'findAll' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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

  async findOneByUsername(payload: object) {
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
        { controller, cmd: 'findOneByUsername' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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

  async findOneById(payload: object) {
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
        { controller, cmd: 'findOneById' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
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

  async update(id: string, payload: object) {
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
        { controller, cmd: 'update' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: { id, ...payload },
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
