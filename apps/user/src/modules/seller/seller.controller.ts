import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SellerService } from './seller.service';
const controller = 'seller';

@Controller()
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(@Payload('payload') createSellerDto: any) {
    return this.sellerService.create(createSellerDto);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll() {
    return this.sellerService.findAll(1);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload('payload') id: string) {
    return this.sellerService.findOneById(id);
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

  @MessagePattern({ controller, cmd: 'getReviewFromBuyer' })
  getReviewFromBuyer(@Payload('payload') updateSellerDto: any) {
    return this.sellerService.getReviewFromBuyer(updateSellerDto);
  }
}
