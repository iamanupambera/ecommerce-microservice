import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SellerService } from './seller.service';
const controller = 'seller';

@Controller()
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(@Payload() createSellerDto: any) {
    return this.sellerService.create(createSellerDto);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll() {
    return this.sellerService.findAll(1);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload() id: string) {
    return this.sellerService.findOneById(id);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload() updateSellerDto: any) {
    return this.sellerService.update(updateSellerDto.id, updateSellerDto);
  }
}
