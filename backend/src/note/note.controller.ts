import {
  Body,
  Put,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Param,
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

  @Get('/suggestion')
  async getSuggestions(@GetUser() user: JwtAuthDto) {
    return await this.noteService.getSuggestions(user.userId);
  }

  @Get('/suggestion/:id')
  async getSuggestionsById(
    @GetUser() user: JwtAuthDto,
    @Param('id') id: string,
  ) {
    return await this.noteService.getSuggestionForNote(id, user.userId);
  }

  @Get('/suggestion/month/:date')
  async getSuggestionsByMonth(
    @GetUser() user: JwtAuthDto,
    @Param('date') date: Date,
  ) {
    return await this.noteService.getSuggestionsForMonth(user.userId, date);
  }

  @Get('streak')
  async getStreak(@GetUser() user: JwtAuthDto) {
    return await this.noteService.getLatestStreak(user.userId);
  }

  @Get()
  async getAllNotes(@GetUser() user: JwtAuthDto) {
    return await this.noteService.getAllUsersNotes(user.userId);
  }

  @Get('/:id')
  async getNote(@GetUser() user: JwtAuthDto, @Param('id') id: string) {
    return await this.noteService.getNote(id, user.userId);
  }

  @Get('/month/:date')
  async getNotesByMonth(
    @GetUser() user: JwtAuthDto,
    @Param('date') date: Date,
  ) {
    return await this.noteService.getNotesByMonth(date, user.userId);
  }

  @Post()
  async createNote(@Body() note: NoteDto, @GetUser() user: JwtAuthDto) {
    await this.noteService.createNote(note, user.userId);
  }

  @Put('/:id')
  async updateNote(
    @Body() note: NoteDto,
    @GetUser() user: JwtAuthDto,
    @Param('id') noteId: string,
  ) {
    await this.noteService.updateNote(note, user.userId, noteId);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') noteId: string) {
    await this.noteService.deleteNote(noteId);
  }
}
