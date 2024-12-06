import {
  Body,
  Put,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getAllNotes(@GetUser() user: JwtAuthDto) {
    return await this.noteService.getAllUsersNotes(user.userId);
  }

  @Get('/:id')
  async getNote(@GetUser() user: JwtAuthDto, @Query('id') id: string) {
    return await this.noteService.getNote(id, user.userId);
  }

  @Post()
  async createNote(@Body() note: NoteDto, @GetUser() user: JwtAuthDto) {
    await this.noteService.createNote(note, user.userId);
  }

  @Put()
  async updateNote(
    @Body() note: NoteDto,
    @GetUser() user: JwtAuthDto,
    @Query('id') noteId: string,
  ) {
    await this.noteService.updateNote(note, user.userId, noteId);
  }

  @Delete()
  async deleteNote(@Query('id') noteId: string) {
    await this.noteService.deleteNote(noteId);
  }
}
