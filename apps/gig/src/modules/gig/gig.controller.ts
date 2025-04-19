import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GigService } from './gig.service';
import {
  CreateGigDto,
  SearchGigDto,
  UpdateGigDto,
} from '@repo/validator/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
import { AuthJwtPayload } from '@repo/modules/index';
const controller = 'gig';

@Controller()
@UseGuards(GatewayJwtGuard)
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(
    @Payload('payload') createGigDto: CreateGigDto,
    @Payload('payload') user: AuthJwtPayload,
  ) {
    return this.gigService.create(createGigDto, user);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(
    @Payload('payload')
    body: SearchGigDto,
  ) {
    return this.gigService.findAll(body);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload('payload') id: string) {
    return this.gigService.findOne(id);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload('payload') { id, ...body }: UpdateGigDto) {
    return this.gigService.update(id, body);
  }

  @MessagePattern({ controller, cmd: 'remove' })
  remove(@Payload('payload') body: { gigId: string; sellerId: string }) {
    return this.gigService.remove(body.gigId, body.sellerId);
  }
}
