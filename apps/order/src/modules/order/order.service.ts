import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayload, LoggerService } from '@repo/modules/index';
import { OrderRepository } from './order.repository';
import {
  approveOrderDto,
  cancelOrderDto,
  createOrderDto,
  CreatePaymentIntentDto,
  OrderDeliveredDto,
  UpdateOrderDto,
  UpdateOrderReviewDto,
} from '@repo/validator/index';
import { ClientProxy } from '@nestjs/microservices';
import { GatewayJwtService } from '../gatewayJwt/gatewayJwt.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class OrderService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly orderRepository: OrderRepository,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
    private readonly gatewayJwtService: GatewayJwtService,
    private readonly logger: LoggerService,
    private readonly orderNotificationService: NotificationService,
  ) {
    this.stripe = new Stripe(this.configService.getOrThrow('STRIPE_API_KEY'), {
      apiVersion: '2025-04-30.basil',
      typescript: true,
    });
  }

  async createPaymentIntent(
    user: AuthJwtPayload,
    {
      buyerId,
      price,
      name,
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
    }: CreatePaymentIntentDto,
  ) {
    const { data: customer } = await this.stripe.customers.search({
      query: `email:"${user.email}"`,
    });

    if (!customer.length) {
      customer[0] = await this.stripe.customers.create({
        email: user.email,
        name,
        metadata: { buyerId },
        address: {
          city,
          country,
          line1,
          line2,
          postal_code,
          state,
        },
      });
    }

    // the service charge is 5.5% of the purchase amount
    // for purchases under $50, an additional $2 is applied
    const serviceFee =
      price < 50 ? (5.5 / 100) * price + 2 : (5.5 / 100) * price;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.floor((price + serviceFee) * 100),
      currency: 'usd',
      customer: customer[0].id,
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 201,
      response: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      message: 'Order intent created successfully.',
    };
  }

  async createOrder(
    createOrder: createOrderDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const serviceFee =
      createOrder.price < 50
        ? (5.5 / 100) * createOrder.price + 2
        : (5.5 / 100) * createOrder.price;
    const {
      offer,
      deliveredWork,
      requestExtension,
      events,
      buyerReview,
      sellerReview,
      ...orderData
    } = createOrder;
    const order = await this.orderRepository.createOrder(
      { ...orderData, serviceFee },
      offer,
      deliveredWork,
      requestExtension,
      events,
      buyerReview,
      sellerReview,
    );

    // update seller info
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'seller', cmd: 'createOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            sellerId: orderData.sellerId,
            ongoingJobs: 1,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    // send email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'order_email_controller', cmd: 'sendOrderPlaced' },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            orderId: orderData.orderId,
            orderDue: createOrder.offer.newDeliveryDate,
            amount: orderData.price,
            buyerUsername: orderData.buyerUsername.toLowerCase(),
            sellerUsername: orderData.sellerUsername.toLowerCase(),
            title: createOrder.offer.gigTitle,
            description: createOrder.offer.description,
            requirements: orderData.requirements,
            orderUrl: `${this.configService.getOrThrow('CLIENT_URL')}/orders/${orderData.orderId}/activities`,
            receiverEmail: order.sellerEmail,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo: order.sellerUsername,
      message: 'placed an order for your gig.',
    });

    return {
      statusCode: 201,
      response: order,
      message: 'Order created successfully.',
    };
  }

  async findOrderById(orderId: string) {
    const order = await this.orderRepository.getOrderByOrderId(orderId);
    return {
      statusCode: 200,
      response: order,
      message: 'Order by order id',
    };
  }

  async findOrdersBySellerId(sellerId: string) {
    const orders = await this.orderRepository.getOrdersBySellerId(sellerId);
    return {
      statusCode: 200,
      response: orders,
      message: 'Seller orders',
    };
  }

  async findOrdersByBuyerId(buyerId: string) {
    const orders = await this.orderRepository.getOrdersByBuyerId(buyerId);
    return {
      statusCode: 200,
      response: orders,
      message: 'Buyer orders',
    };
  }

  async requestOrderDeliveryDateExtension(
    body: UpdateOrderDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const order = await this.orderRepository.requestDeliveryExtension(
      body.orderId,
      body,
    );

    // send email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'order_email_controller', cmd: 'sendOrderExtension' },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            buyerUsername: order.buyerUsername.toLowerCase(),
            sellerUsername: order.sellerUsername.toLowerCase(),
            originalDate: `${order.offer.oldDeliveryDate}`,
            newDate: `${order.offer.newDeliveryDate}`,
            reason: order.offer.reason,
            orderUrl: `${this.configService.getOrThrow('CLIENT_URL')}/orders/${body.orderId}/activities`,
            receiverEmail: order.buyerEmail,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo: order.buyerUsername,
      message: 'requested for an order delivery date extension.',
    });

    return {
      statusCode: 200,
      response: order,
      message: 'Order delivery Extension request',
    };
  }

  async changeDeliveryDate(
    body: UpdateOrderDto,
    userToken: string,
    user: AuthJwtPayload,
  ) {
    const payload = {
      orderUrl: `${this.configService.getOrThrow('CLIENT_URL')}/orders/${body.orderId}/activities`,
    };

    if (body.type === 'APPROVE') {
      const order = await this.orderRepository.approveDeliveryDate(
        body.orderId,
        body,
      );

      payload['subject'] =
        'Congratulations: Your extension request was approved';
      payload['buyerUsername'] = order.buyerUsername.toLowerCase();
      payload['sellerUsername'] = order.sellerUsername.toLowerCase();
      payload['header'] = 'Request Accepted';
      payload['type'] = body.type;
      payload['message'] = 'You can continue working on the order.';
    }

    if (body.type === 'REJECT') {
      const order = await this.orderRepository.rejectDeliveryDate(body.orderId);
      payload['subject'] = 'Sorry: Your extension request was rejected';
      payload['buyerUsername'] = order.buyerUsername.toLowerCase();
      payload['sellerUsername'] = order.sellerUsername.toLowerCase();
      payload['header'] = 'Request Rejected';
      payload['type'] = body.type;
      payload['message'] = 'You can contact the buyer for more information.';

      // send notification
      await this.orderNotificationService.sendNotification({
        orderId: order.id,
        senderUsername: order.sellerUsername,
        senderPicture: order.sellerImage,
        receiverUsername: order.buyerUsername,
        receiverPicture: order.buyerImage,
        userTo: order.sellerUsername,
        message: 'rejected your order delivery date extension request.',
      });
    }

    // send email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        {
          controller: 'order_email_controller',
          cmd: 'orderExtensionApprovalRequest',
        },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload,
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    return {
      statusCode: 200,
      response: {},
      message: 'Order delivery date extension',
    };
  }

  async approveOrder(
    data: approveOrderDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const order = await this.orderRepository.approveOrder(data.orderId);

    // update seller info
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'seller', cmd: 'approveOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            sellerId: data.sellerId,
            buyerId: data.buyerId,
            ongoingJobs: data.ongoingJobs,
            completedJobs: data.completedJobs,
            totalEarnings: data.totalEarnings,
            recentDelivery: `${new Date()}`,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    // update buyer info
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'buyer', cmd: 'purchasedGigs' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            buyerId: data.buyerId,
            purchasedGigs: data.purchasedGigs,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo: order.sellerUsername,
      message: 'approved your order delivery.',
    });

    return {
      statusCode: 200,
      response: order,
      message: 'Order approved successfully.',
    };
  }

  async deliverOrder(
    body: OrderDeliveredDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    const order = await this.orderRepository.sellerDeliverOrder(
      body.orderId,
      body,
    );

    // send email
    this.notificationService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        {
          controller: 'order_email_controller',
          cmd: 'orderDeliveredNotification',
        },
        {
          userToken,
          serviceToken:
            await this.gatewayJwtService.generateToken('NOTIFICATION'),
          payload: {
            buyerUsername: order.buyerUsername.toLowerCase(),
            sellerUsername: order.sellerUsername.toLowerCase(),
            title: order.offer.gigTitle,
            orderUrl: `${this.configService.getOrThrow('CLIENT_URL')}/orders/${body.orderId}/activities`,
            receiverEmail: order.buyerEmail,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo: order.buyerUsername,
      message: 'delivered your order.',
    });

    return {
      statusCode: 200,
      response: order,
      message: 'Order delivered successfully.',
    };
  }

  async updateOrderReview(body: UpdateOrderReviewDto) {
    const order = await this.orderRepository.updateOrderReview(body);
    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo:
        body.type === 'buyer-review'
          ? order.sellerUsername
          : order.buyerUsername,
      message: `left you a ${body.rating} star review`,
    });

    return {
      statusCode: 200,
      response: order,
      message: 'review update successfully.',
    };
  }

  async cancelOrder(
    body: cancelOrderDto,
    user: AuthJwtPayload,
    userToken: string,
  ) {
    await this.stripe.refunds.create({
      payment_intent: `${body.paymentIntent}`,
    });
    const order = await this.orderRepository.cancelOrder(body.orderId);
    // update seller info
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'seller', cmd: 'cancelOrder' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            sellerId: body.sellerId,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    // update buyer info
    this.userService
      .send<
        object,
        {
          userToken: string;
          serviceToken: string;
          payload: object;
          user: object;
        }
      >(
        { controller: 'buyer', cmd: 'purchasedGigs' },
        {
          userToken,
          serviceToken: await this.gatewayJwtService.generateToken('USER'),
          payload: {
            type: 'cancel-order',
            buyerId: body.buyerId,
            purchasedGigs: body.purchasedGigs,
          },
          user,
        },
      )
      .subscribe({
        error: (error) => {
          this.logger.log(
            'error',
            OrderService.name + ' service error at auth register',
            error,
          );
        },
      });

    await this.orderNotificationService.sendNotification({
      orderId: order.id,
      senderUsername: order.sellerUsername,
      senderPicture: order.sellerImage,
      receiverUsername: order.buyerUsername,
      receiverPicture: order.buyerImage,
      userTo: order.sellerUsername,
      message: 'cancelled your order delivery.',
    });

    return {
      statusCode: 200,
      response: order,
      message: 'Order cancelled successfully.',
    };
  }
}
