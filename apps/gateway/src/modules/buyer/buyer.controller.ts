import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { AuthJwtPayload } from '@repo/modules/index';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Get()
  getLoginUserBuyerDetails(@AuthUser() user: AuthJwtPayload) {
    return this.buyerService.getLoginUserBuyerDetails({}, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() user: AuthJwtPayload) {
    return this.buyerService.findOne({ id }, user);
  }
}
