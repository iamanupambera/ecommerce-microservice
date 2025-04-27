import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GigService } from './gig.service';
import {
  CreateGigDto,
  findByIdDto,
  SearchGigDto,
  UpdateGigDto,
} from '@repo/validator/index';
import { GatewayJwtGuard } from 'src/shared/gatewayJwt.guard';
import { AuthJwtPayload } from '@repo/modules/index';
import { ratingTypes } from './gig.repository';
const controller = 'gig';

@Controller()
@UseGuards(GatewayJwtGuard)
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @MessagePattern({ controller, cmd: 'create' })
  create(
    @Payload('payload') createGigDto: CreateGigDto,
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.gigService.create(createGigDto, user);
  }

  @MessagePattern({ controller, cmd: 'findAll' })
  findAll(@Payload('payload') body: SearchGigDto) {
    return this.gigService.findAll(body);
  }

  @MessagePattern({ controller, cmd: 'findSellerGigs' })
  findSellerGigs(@Payload('payload') body: findByIdDto) {
    return this.gigService.findSellerGigs(body.id);
  }

  @MessagePattern({ controller, cmd: 'findSellerInactiveGigs' })
  findSellerInactiveGigs(@Payload('payload') body: findByIdDto) {
    return this.gigService.findSellerInactiveGigs(body.id);
  }

  @MessagePattern({ controller, cmd: 'findGigsByCategory' })
  findGigsByCategory(@Payload('user') { username }: AuthJwtPayload) {
    return this.gigService.findGigsByCategory(username);
  }

  @MessagePattern({ controller, cmd: 'findTopRatedGigsByCategory' })
  findTopRatedGigsByCategory(@Payload('user') { username }: AuthJwtPayload) {
    return this.gigService.findTopRatedGigsByCategory(username);
  }

  @MessagePattern({ controller, cmd: 'findMoreGigsLikeThis' })
  findMoreGigsLikeThis(@Payload('payload') body: findByIdDto) {
    return this.gigService.findMoreGigsLikeThis(body.id);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(
    @Payload('payload') body: findByIdDto,
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.gigService.findOne(body.id, user);
  }

  @MessagePattern({ controller, cmd: 'update' })
  update(@Payload('payload') { id, ...body }: UpdateGigDto) {
    return this.gigService.update(id, body);
  }

  @MessagePattern({ controller, cmd: 'updateGigReview' })
  updateGigReview(
    @Payload('payload')
    body: {
      gigId: string;
      rating: keyof typeof ratingTypes;
    },
  ) {
    return this.gigService.updateGigReview(body);
  }

  @MessagePattern({ controller, cmd: 'changeStatus' })
  changeStatus(@Payload('payload') { status, gigId }: any) {
    return this.gigService.changeStatus(gigId, status);
  }

  @MessagePattern({ controller, cmd: 'remove' })
  remove(@Payload('payload') body: findByIdDto) {
    return this.gigService.remove(body.id);
  }
}
