import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SellerService } from './seller.service';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
const controller = 'seller';

@Controller()
@UseGuards(GatewayJwtGuard)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(@Payload('payload') createSellerDto: any) {
    return this.sellerService.create(createSellerDto);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(@Payload('payload') body: any) {
    return this.sellerService.findAll(body.count);
  }

  @MessagePattern({ controller, cmd: 'findOneById' })
  findOneById(@Payload('payload') payload: any) {
    return this.sellerService.findOneById(payload.id);
  }

  @MessagePattern({ controller, cmd: 'findOneByUsername' })
  findOneByUsername(@Payload('payload') payload: any) {
    return this.sellerService.findOneByUsername(payload.username);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.update(updateSellerDto.id, updateSellerDto);
  }

  @MessagePattern({ controller, cmd: 'createOrder' })
  createOrder(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.createOrder(updateSellerDto);
  }

  @MessagePattern({ controller, cmd: 'approveOrder' })
  approveOrder(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.approveOrder(updateSellerDto);
  }

  @MessagePattern({ controller, cmd: 'cancelOrder' })
  cancelOrder(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.cancelOrder(updateSellerDto);
  }

  @MessagePattern({ controller, cmd: 'updateGigsCount' })
  updateGigsCount(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.updateGigsCount(updateSellerDto);
  }

  @EventPattern({ controller, cmd: 'getReviewFromBuyer' })
  getReviewFromBuyer(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.getReviewFromBuyer(updateSellerDto);
  }
}
