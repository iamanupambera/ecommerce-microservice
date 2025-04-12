import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GigService } from './gig.service';
import { CreateGigDto, UpdateGigDto } from '@repo/validator/index';
const controller = 'gig';

@Controller()
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(@Payload('payload') createGigDto: CreateGigDto) {
    return this.gigService.create(createGigDto);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll() {
    return this.gigService.findAll();
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(@Payload('payload') id: number) {
    return this.gigService.findOne(id);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload('payload') updateGigDto: UpdateGigDto) {
    return this.gigService.update(updateGigDto.id, updateGigDto);
  }

  @MessagePattern({ controller, cmd: 'remove' })
  remove(@Payload('payload') id: number) {
    return this.gigService.remove(id);
  }
}
