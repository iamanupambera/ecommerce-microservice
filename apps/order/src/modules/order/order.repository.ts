import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  getOrderByOrderId(orderId: string) {
    return this.dbRead.prisma.order.findFirst({
      where: { orderId },
    });
  }

  getOrdersBySellerId(sellerId: string) {
    return this.dbRead.prisma.order.findMany({
      where: { sellerId },
    });
  }

  getOrdersByBuyerId(buyerId: string) {
    return this.dbRead.prisma.order.findMany({
      where: { buyerId },
    });
  }

  createOrder(
    orderData: Prisma.OrderCreateInput,
    offerData: Prisma.OfferCreateInput,
    deliveredWork: Omit<Prisma.DeliveredWorkCreateManyInput, 'orderId'>[],
    requestExtension: Prisma.RequestExtensionCreateInput,
    events: Prisma.EventsCreateInput,
    buyerReview: Prisma.ReviewCreateInput,
    sellerReview: Prisma.ReviewCreateInput,
  ) {
    return this.dbWrite.prisma.order.create({
      data: {
        ...orderData,
        offer: { create: offerData },
        deliveredWork: { create: deliveredWork },
        requestExtension: { create: requestExtension },
        events: { create: events },
        buyerReview: { create: buyerReview },
        sellerReview: { create: sellerReview },
      },
    });
  }

  cancelOrder(orderId: string) {
    return this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        status: 'CANCELLED',
        approvedAt: new Date(),
      },
    });
  }

  approveOrder(orderId: string) {
    return this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }

  async sellerDeliverOrder(
    orderId: string,
    deliveredWork: Omit<Prisma.DeliveredWorkCreateInput, 'order'>,
  ) {
    const order = await this.dbRead.prisma.order.findFirst({
      where: { orderId },
      include: {
        offer: true,
      },
    });

    if (!order) {
      throw new NotFoundException('notfound error');
    }

    await this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        status: 'DELIVERED',
        events: {
          create: { orderDelivered: new Date() },
        },
        deliveredWork: { create: deliveredWork },
      },
    });

    return order;
  }

  async requestDeliveryExtension(
    orderId: string,
    data: Prisma.RequestExtensionCreateInput,
  ) {
    const order = await this.dbRead.prisma.order.findFirst({
      where: { orderId },
      include: {
        offer: true,
      },
    });

    if (!order) {
      throw new NotFoundException('notfound error');
    }

    await this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        requestExtension: {
          update: data,
        },
      },
    });

    return order;
  }

  async approveDeliveryDate(
    orderId: string,
    data: Prisma.RequestExtensionUpdateInput & { deliveryDateUpdate: Date },
  ) {
    return this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        offer: {
          update: {
            deliveryInDays: data.days,
            newDeliveryDate: data.newDate,
            reason: data.reason,
          },
        },
        events: {
          update: {
            deliveryDateUpdate: new Date(`${data.deliveryDateUpdate}`),
          },
        },
        requestExtension: {
          update: { originalDate: '', newDate: '', days: 0, reason: '' },
        },
      },
    });
  }

  async rejectDeliveryDate(orderId: string) {
    return this.dbWrite.prisma.order.update({
      where: { orderId },
      data: {
        requestExtension: {
          update: { originalDate: '', newDate: '', days: 0, reason: '' },
        },
      },
    });
  }

  async updateOrderReview(
    data: Prisma.ReviewCreateInput & {
      orderId: string;
      type: 'buyer-review' | 'seller-review';
    },
  ) {
    return this.dbWrite.prisma.order.update({
      where: { orderId: data.orderId },
      data:
        data.type === 'buyer-review'
          ? {
              buyerReview: {
                create: {
                  rating: data.rating,
                  review: data.review,
                  created: new Date(`${data.created}`),
                },
              },
              events: {
                update: { buyerReview: new Date(`${data.created}`) },
              },
            }
          : {
              sellerReview: {
                create: {
                  rating: data.rating,
                  review: data.review,
                  created: new Date(`${data.created}`),
                },
              },
              events: {
                update: { sellerReview: new Date(`${data.created}`) },
              },
            },
    });
  }
}
