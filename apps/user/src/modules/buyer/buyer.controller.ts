import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BuyerService } from './buyer.service';
import { AuthJwtPayload } from '@repo/modules/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
const controller = 'buyer';

@Controller()
@UseGuards(GatewayJwtGuard)
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(@Payload('payload') payload: any) {
    return this.buyerService.create(payload);
  }

  @MessagePattern({ controller, cmd: 'getLoginUserBuyerDetails' })
  getLoginUserBuyerDetails(@Payload('user') user: AuthJwtPayload) {
    return this.buyerService.getLoginUserBuyerDetails(user.email);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload('payload') payload: { username: string }) {
    return this.buyerService.findOne(payload.username);
  }

  @MessagePattern({ controller, cmd: 'buyerPurchasedGigs' })
  buyerPurchasedGigs(@Payload('payload') payload: any) {
    return this.buyerService.buyerPurchasedGigs(payload);
  }
}
