import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { MessageDto } from './dto/message.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:id')
  async getChatMessages(@Param('id') id: string) {
    return await this.chatService.getChatMessages(id);
  }
  @Post()
  async createChat(): Promise<{ psychologistId: string }> {
    return {
      psychologistId: await this.chatService.createChat(),
    };
  }

  @Post('/message')
  async createMessage(
    @GetUser() sender: JwtAuthDto,
    @Body() message: MessageDto,
  ) {
    await this.chatService.createMessage(
      message.message,
      sender.userId,
      message.receiverId,
      message.chatId,
    );
  }

  @Put('/message/:id')
  async updateMessage(
    @GetUser() sender: JwtAuthDto,
    @Body('message') message: string,
    @Param('id') messageId: string,
  ) {
    await this.chatService.updateMessage(messageId, message, sender.userId);
  }

  @Delete('/message/:id')
  async deleteMessage(
    @GetUser() sender: JwtAuthDto,
    @Param('id') messageId: string,
  ) {
    await this.chatService.deleteMessage(messageId, sender.userId);
  }

  @Delete('/:id')
  async deleteChat(@Param('id') id: string) {
    await this.chatService.deleteChat(id);
  }
}
