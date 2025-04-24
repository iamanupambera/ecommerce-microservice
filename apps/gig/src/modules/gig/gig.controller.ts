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
  findAll(
    @Payload('payload')
    body: SearchGigDto,
  ) {
    return this.gigService.findAll(body);
  }

  @MessagePattern({ controller, cmd: 'findSellerGigs' })
  findSellerGigs(@Payload('payload') body: { sellerId: string }) {
    return this.gigService.findSellerGigs(body.sellerId);
  }

  @MessagePattern({ controller, cmd: 'findSellerInactiveGigs' })
  findSellerInactiveGigs(@Payload('payload') body: { sellerId: string }) {
    return this.gigService.findSellerInactiveGigs(body.sellerId);
  }

  @MessagePattern({ controller, cmd: 'findGigsByCategory' })
  findGigsByCategory(@Payload('payload') body: { username: string }) {
    return this.gigService.findGigsByCategory(body.username);
  }

  @MessagePattern({ controller, cmd: 'findTopRatedGigsByCategory' })
  findTopRatedGigsByCategory(@Payload('payload') body: { username: string }) {
    return this.gigService.findTopRatedGigsByCategory(body.username);
  }

  @MessagePattern({ controller, cmd: 'findMoreGigsLikeThis' })
  findMoreGigsLikeThis(@Payload('payload') body: { gigId: string }) {
    return this.gigService.findMoreGigsLikeThis(body.gigId);
  }

  @MessagePattern({ controller, cmd: 'findOne' })
  findOne(
    @Payload('payload') { id }: { id: string },
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.gigService.findOne(id, user);
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
  changeStatus(
    @Payload('payload') { status, gigId }: { gigId: string; status: boolean },
  ) {
    return this.gigService.changeStatus(gigId, status);
  }

  @MessagePattern({ controller, cmd: 'remove' })
  remove(@Payload('payload') body: { gigId: string; sellerId: string }) {
    return this.gigService.remove(body.gigId, body.sellerId);
  }
}
