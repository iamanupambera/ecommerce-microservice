import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SellerService } from './seller.service';
import { GatewayJwtGuard } from '../../shared/gatewayJwt.guard';
import {
  ApproveOrderDto,
  CancelOrderDto,
  CreateOrderDto,
  GetReviewFromBuyerDto,
  SellerDto,
  UpdateGigsCountDto,
} from '@repo/validator/index';
import { AuthJwtPayload } from '@repo/modules/index';
const controller = 'seller';

@Controller()
@UseGuards(GatewayJwtGuard)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(
    @Payload('payload') createSellerDto: SellerDto,
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.sellerService.create(createSellerDto, user);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(@Payload('payload') body: { size: string }) {
    return this.sellerService.findAll(+body.size);
  }

  @MessagePattern({ controller, cmd: 'findOneById' })
  findOneById(@Payload('payload') payload: { id: string }) {
    return this.sellerService.findOneById(payload.id);
  }

  @MessagePattern({ controller, cmd: 'findOneByUsername' })
  findOneByUsername(@Payload('payload') payload: { username: string }) {
    return this.sellerService.findOneByUsername(payload.username);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload('payload') updateSellerDto: SellerDto) {
    return this.sellerService.update(updateSellerDto.id, updateSellerDto);
  }

  @MessagePattern({ controller, cmd: 'createOrder' })
  createOrder(@Payload('payload') payload: CreateOrderDto) {
    return this.sellerService.createOrder(payload);
  }

  @MessagePattern({ controller, cmd: 'approveOrder' })
  approveOrder(@Payload('payload') payload: ApproveOrderDto) {
    return this.sellerService.approveOrder(payload);
  }

  @MessagePattern({ controller, cmd: 'cancelOrder' })
  cancelOrder(@Payload('payload') payload: CancelOrderDto) {
    return this.sellerService.cancelOrder(payload);
  }

  @MessagePattern({ controller, cmd: 'updateGigsCount' })
  updateGigsCount(@Payload('payload') payload: UpdateGigsCountDto) {
    return this.sellerService.updateGigsCount(payload);
  }

  @EventPattern({ controller, cmd: 'getReviewFromBuyer' })
  getReviewFromBuyer(@Payload('payload') payload: GetReviewFromBuyerDto) {
    return this.sellerService.getReviewFromBuyer(payload);
  }
}
