import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, Role } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class MessageService {
  constructor(private prisma: DbService) {}

  async findPsychologist() {
    return this.prisma.user.findFirst({
      where: {
        role: Role.PSYCHOLOGIST,
      },
      select: {
        id: true,
        fullName: true,
      },
    });
  }

  async sendMessage(
    createMessageDto: CreateMessageDto,
    senderId: string,
  ): Promise<Message> {
    const { content, receiverId } = createMessageDto;

    return this.prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });
  }

  async getConversations(userId: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    // Group messages by conversation partner
    const conversations = messages.reduce((acc, message) => {
      const partnerId =
        message.senderId === userId ? message.receiverId : message.senderId;

      if (!acc[partnerId]) {
        acc[partnerId] = [];
      }

      acc[partnerId].push(message);

      return acc;
    }, {});

    return conversations;
  }

  async getConversation(userId: string, partnerId: string) {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return messages;
  }
}
