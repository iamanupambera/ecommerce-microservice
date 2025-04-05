import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BuyerService } from './buyer.service';
import { AuthJwtPayload } from '@repo/modules/index';
const controller = 'buyer';

@Controller()
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @MessagePattern({ controller, cmd: 'getLoginUserBuyerDetails' })
  getLoginUserBuyerDetails(@Payload('user') user: AuthJwtPayload) {
    return this.buyerService.getLoginUserBuyerDetails(user.email);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload() username: string) {
    return this.buyerService.findOne(username);
  }
}
