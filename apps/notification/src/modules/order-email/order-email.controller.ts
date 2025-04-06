import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEmailService } from './order-email.service';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';

@Controller()
@UseGuards(GatewayJwtGuard)
export class OrderEmailController {
  constructor(private readonly orderEmailService: OrderEmailService) {}

  @MessagePattern('createOrderEmail')
  create(@Payload() createOrderEmailDto: object) {
    return this.orderEmailService.create(createOrderEmailDto);
  }

  @MessagePattern('findAllOrderEmail')
  findAll() {
    return this.orderEmailService.findAll();
  }

  @MessagePattern('findOneOrderEmail')
  findOne(@Payload() id: number) {
    return this.orderEmailService.findOne(id);
  }

  @MessagePattern('updateOrderEmail')
  update(@Payload() updateOrderEmailDto: any) {
    return this.orderEmailService.update(
      updateOrderEmailDto.id,
      updateOrderEmailDto,
    );
  }

  @MessagePattern('removeOrderEmail')
  remove(@Payload() id: number) {
    return this.orderEmailService.remove(id);
  }
}
