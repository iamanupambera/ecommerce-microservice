import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthUser } from 'src/shared/decorators/auth-user.decorator';
import { AuthJwtPayload } from '@repo/modules/index';
import { AuthGuard } from '@nestjs/passport';
import { BearerToken } from 'src/shared/decorators/bearer-token.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
  ) {
    return this.orderService.createPaymentIntent(payload, user);
  }

  @Post()
  async createOrder(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.createOrder(payload, user, userToken);
  }

  @Get(':orderId')
  async findOrderById(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('orderId') id: string,
  ) {
    return this.orderService.findOrderById(user, userToken, id);
  }

  @Get('seller/:sellerId')
  async findOrdersBySellerId(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('sellerId') sellerId: string,
  ) {
    return this.orderService.findOrdersBySellerId(user, userToken, sellerId);
  }

  @Get('buyer/:buyerId')
  async findOrdersByBuyerId(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('buyerId') buyerId: string,
  ) {
    return this.orderService.findOrdersByBuyerId(user, userToken, buyerId);
  }

  @Put('extension/:orderId')
  async requestOrderDeliveryDateExtension(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.requestOrderDeliveryDateExtension(
      payload,
      user,
      userToken,
    );
  }

  @Put('gig/:type/:orderId')
  async changeDeliveryDate(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('type') type: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.changeDeliveryDate(
      { ...payload, type, orderId },
      user,
      userToken,
    );
  }

  @Put('approve-order/:orderId')
  async buyerApproveOrder(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.buyerApproveOrder(payload, user, userToken);
  }

  @Put('deliver-order/:orderId')
  async deliverOrder(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.deliverOrder(payload, user, userToken);
  }

  @Put('cancel/:orderId')
  async cancelOrder(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.cancelOrder(payload, user, userToken);
  }

  @Get('notification/:userTo')
  findAllNOtification(
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
    @Param('userTo') userTo: string,
  ) {
    return this.orderService.findAllNOtification(user, userToken, userTo);
  }

  @Put('notification/mark-as-read')
  updateNotification(
    @Body() payload: object,
    @AuthUser() user: AuthJwtPayload,
    @BearerToken() userToken: string,
  ) {
    return this.orderService.updateNotification(payload, user, userToken);
  }
}
