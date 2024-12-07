import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('psychologist')
  async findPsychologist() {
    return this.messageService.findPsychologist();
  }
  @Post()
  async sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.messageService.sendMessage(createMessageDto, user.userId);
  }

  @Get('conversations/:userId')
  async getUserConversations(@Param('userId') userId: string) {
    return this.messageService.getConversations(userId);
  }

  @Get('conversation/:partnerId')
  async getConversation(
    @Param('partnerId') partnerId: string,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.messageService.getConversation(user.userId, partnerId);
  }
}
