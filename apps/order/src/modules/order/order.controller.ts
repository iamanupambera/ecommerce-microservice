import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthJwtPayload } from '@repo/modules/index';
import {
  approveOrderDto,
  cancelOrderDto,
  createOrderDto,
  CreatePaymentIntentDto,
  OrderDeliveredDto,
  UpdateOrderDto,
  UpdateOrderReviewDto,
} from '@repo/validator/index';
const controller = '';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ controller, cmd: 'createPaymentIntent' })
  async createPaymentIntent(
    @Payload('payload') createPaymentIntentDto: CreatePaymentIntentDto,
    @Payload('user') user: AuthJwtPayload,
  ) {
    return this.orderService.createPaymentIntent(user, createPaymentIntentDto);
  }

  @MessagePattern({ controller, cmd: 'createOrder' })
  async createOrder(
    @Payload('payload') createOrder: createOrderDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.createOrder(createOrder, user, userToken);
  }

  @MessagePattern({ controller, cmd: 'findOrderById' })
  async findOrderById(@Payload('payload') body: { id: string }) {
    return this.orderService.findOrderById(body.id);
  }

  @MessagePattern({ controller, cmd: 'findOrderById' })
  async findOrdersBySellerId(@Payload('payload') body: { id: string }) {
    return this.orderService.findOrdersBySellerId(body.id);
  }

  @MessagePattern({ controller, cmd: 'findOrderById' })
  async findOrdersByBuyerId(@Payload('payload') body: { id: string }) {
    return this.orderService.findOrdersByBuyerId(body.id);
  }

  @MessagePattern({ controller, cmd: 'requestOrderDeliveryDateExtension' })
  async requestOrderDeliveryDateExtension(
    @Payload('payload') body: UpdateOrderDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.requestOrderDeliveryDateExtension(
      body,
      user,
      userToken,
    );
  }

  @MessagePattern({ controller, cmd: 'changeDeliveryDate' })
  async changeDeliveryDate(
    @Payload('payload') body: UpdateOrderDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.changeDeliveryDate(body, userToken, user);
  }

  @MessagePattern({ controller, cmd: 'buyerApproveOrder' })
  async buyerApproveOrder(
    @Payload('payload') body: approveOrderDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.approveOrder(body, user, userToken);
  }

  @MessagePattern({ controller, cmd: 'deliverOrder' })
  async deliverOrder(
    @Payload('payload') body: OrderDeliveredDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.deliverOrder(body, user, userToken);
  }

  @MessagePattern({ controller, cmd: 'updateOrderReview' })
  async updateOrderReview(@Payload('payload') body: UpdateOrderReviewDto) {
    return this.orderService.updateOrderReview(body);
  }

  @MessagePattern({ controller, cmd: 'cancelOrder' })
  async cancelOrder(
    @Payload('payload') body: cancelOrderDto,
    @Payload('user') user: AuthJwtPayload,
    @Payload('userToken') userToken: string,
  ) {
    return this.orderService.cancelOrder(body, user, userToken);
  }
}
