import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
// const controller = 'auth_controller';

@Injectable()
export class SearchService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
  ) {}

  findAll() {
    return `This action returns all search`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }
}
