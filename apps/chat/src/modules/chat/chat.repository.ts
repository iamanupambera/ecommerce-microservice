import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaReadService } from '../prisma/prisma-read.service';
import { PrismaWriteService } from '../prisma/prisma-write.service';
import { $Enums, Prisma } from '@prisma/client';

@Injectable()
export class ChatRepository {
  constructor(
    private readonly dbWrite: PrismaWriteService,
    private readonly dbRead: PrismaReadService,
  ) {}

  createConversation(sender: string, receiver: string) {
    return this.dbWrite.prisma.conversation.create({
      data: {
        senderUsername: sender,
        receiverUsername: receiver,
      },
    });
  }

  async addMessage(
    data: Omit<Prisma.MessageCreateInput, 'conversation'>,
    conversationId: string,
    offer: Omit<Prisma.OfferCreateInput, 'message'>,
  ) {
    const conversation = await this.dbRead.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    const message = await this.dbWrite.prisma.message.create({
      data: { ...data, conversationId },
    });

    await this.dbWrite.prisma.conversation.update({
      data: { lastMessageId: message.id },
      where: { id: conversationId },
    });

    if (offer) {
      await this.dbWrite.prisma.offer.create({
        data: { ...offer, messageId: message.id },
      });
    }
    return message;
  }

  getConversationListByParticipant(sender: string, receiver: string) {
    return this.dbRead.prisma.message.findMany({
      where: {
        OR: [
          { senderUsername: sender, receiverUsername: receiver },
          { senderUsername: receiver, receiverUsername: sender },
        ],
      },
    });
  }

  getUserConversationList(username: string) {
    return this.dbRead.prisma.conversation.findMany({
      where: {
        OR: [{ senderUsername: username }, { receiverUsername: username }],
      },
      include: {
        lastMessage: true,
      },
    });
  }

  getMessages(sender: string, receiver: string) {
    return this.dbRead.prisma.message.findMany({
      where: {
        OR: [
          { senderUsername: sender, receiverUsername: receiver },
          { senderUsername: receiver, receiverUsername: sender },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  getUserMessages(conversationId: string) {
    return this.dbRead.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  updateOffer(messageId: string, type: $Enums.OfferStatus) {
    return this.dbWrite.prisma.message.update({
      where: { id: messageId },
      data: {
        Offer: { update: { data: { status: type } } },
      },
    });
  }

  markMessageAsRead(messageId: string) {
    return this.dbRead.prisma.message.update({
      where: { id: messageId },
      data: {
        isRead: true,
      },
    });
  }

  async markMessagesAsRead(
    receiver: string,
    sender: string,
    messageId: string,
  ) {
    await this.dbWrite.prisma.message.updateMany({
      where: {
        senderUsername: sender,
        receiverUsername: receiver,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    return this.dbRead.prisma.message.findUnique({
      where: { id: messageId },
    });
  }
}
