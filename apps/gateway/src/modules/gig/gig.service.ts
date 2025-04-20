import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { catchError, map } from 'rxjs';
const controller = 'gig';

@Injectable()
export class GigService {
  constructor(
    @Inject('GIG_SERVICE') private readonly gigService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  async create(payload: object, user: AuthJwtPayload) {
    return this.gigService
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
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async findAll(payload: object) {
    return this.gigService
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
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async getSellerGigs(sellerId: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getSellerGigs' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async getSellerPausedGigs(sellerId: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getSellerPausedGigs' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async getGigsByCategory(username: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getGigsByCategory' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
          payload: { username },
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

  async getTopRatedGigsByCategory(username: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getTopRatedGigsByCategory' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
          payload: { username },
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

  async getMoreGigsLikeThis(gigId: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'getMoreGigsLikeThis' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async findOne(id: string) {
    return this.gigService
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
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
          payload: { id },
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

  async update(id: string, updateGig: object, user: AuthJwtPayload) {
    return this.gigService
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
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
          payload: { ...updateGig, id },
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

  async gigChangeStatus(gigId: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'gigChangeStatus' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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

  async remove(id: string, user: AuthJwtPayload) {
    return this.gigService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller, cmd: 'remove' },
        {
          userToken: null,
          serviceToken: await this.gatewayJwtService.generateToken('GIG'),
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
}
