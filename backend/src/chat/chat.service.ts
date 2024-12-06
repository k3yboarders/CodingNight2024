import { HttpException, HttpStatus } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

export class ChatService {
  constructor(private readonly dbService: DbService) {}

  async getChatMessages(chatId: string) {
    return await this.dbService.chat.findMany({
      where: {
        id: chatId,
      },
    });
  }

  async createChat(): Promise<string> {
    await this.dbService.chat.create({});
    const availablePsychologists = await this.dbService.user.findMany({
      where: {
        role: 'PSYCHOLOGIST',
      },
    });
    return availablePsychologists[
      Math.floor(Math.random() * availablePsychologists.length)
    ].id;
  }

  async createMessage(
    message: string,
    senderId: string,
    receiverId: string,
    chatId: string,
  ) {
    return await this.dbService.message.create({
      data: {
        content: message,
        senderId,
        receiverId,
        chatId,
      },
    });
  }

  async verifySender(senderId: string, messageId: string) {
    const message = await this.dbService.message.findUnique({
      where: {
        id: messageId,
      },
      select: {
        senderId: true,
      },
    });
    if (!message) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }
    if (message.senderId !== senderId) {
      throw new HttpException(
        'You are not the sender of this message',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateMessage(messageId: string, newContent: string, senderId: string) {
    await this.verifySender(senderId, messageId);

    return await this.dbService.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: newContent,
      },
    });
  }

  async deleteMessage(messageId: string, senderId: string) {
    await this.verifySender(senderId, messageId);
    return await this.dbService.message.delete({
      where: {
        id: messageId,
      },
    });
  }

  async deleteChat(chatId: string) {
    return await this.dbService.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
}
