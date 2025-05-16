import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { catchError, map } from 'rxjs';
const controller = 'order';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async createPaymentIntent(payload: object, user: AuthJwtPayload) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'createPaymentIntent' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async createOrder(payload: object, user: AuthJwtPayload, userToken: string) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'createOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async findOrderById(user: AuthJwtPayload, userToken: string, id: string) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'findOrderById' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
          payload: { id },
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

  async findOrdersBySellerId(
    user: AuthJwtPayload,
    userToken: string,
    sellerId: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'findOrdersBySellerId' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async findOrdersByBuyerId(
    user: AuthJwtPayload,
    userToken: string,
    buyerId: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'findOrdersByBuyerId' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
          payload: { buyerId },
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

  async requestOrderDeliveryDateExtension(
    payload: object,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'requestOrderDeliveryDateExtension' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async changeDeliveryDate(
    payload: object,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'changeDeliveryDate' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async buyerApproveOrder(
    payload: object,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'buyerApproveOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async deliverOrder(payload: object, user: AuthJwtPayload, userToken: string) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'deliverOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async updateOrderReview(
    payload: object,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'updateOrderReview' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async cancelOrder(payload: object, user: AuthJwtPayload, userToken: string) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'cancelOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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

  async findAllNOtification(
    user: AuthJwtPayload,
    userToken: string,
    userTo: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'notification', cmd: 'findAll' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
          payload: { userTo },
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

  async updateNotification(
    payload: object,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    return this.orderService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'notification', cmd: 'update' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('ORDER'),
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
