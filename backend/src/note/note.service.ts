import { NoteDto } from './dto/note.dto';
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: DbService) {}

  async getAllUsersNotes(userId: string) {
    return await this.prisma.note.findMany({
      where: { userId },
    });
  }

  async getNote(id: string, userId: string) {
    return await this.prisma.note.findUnique({
      where: { id, userId },
    });
  }

  async getNotesByMonth(fullDate: Date): Promise<NoteDto[]> {
    return await this.prisma.note.findMany({
      where: {
        day: {
          gte: new Date(fullDate.getFullYear(), fullDate.getMonth(), 0),
          lte: new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0),
        },
      },
    });
  }

  async createNote(note: NoteDto, userId: string) {
    await this.prisma.note.create({
      data: Object.assign(note, { userId }),
    });
  }
  async updateNote(note: NoteDto, userId: string, noteId: string) {
    await this.prisma.note.update({
      where: { id: noteId },
      data: Object.assign(note, { userId }),
    });
  }
  async deleteNote(noteId: string) {
    await this.prisma.note.delete({
      where: { id: noteId },
    });
  }
}
