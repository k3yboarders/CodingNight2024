import { NoteDto } from './dto/note.dto';
import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { SUGGESTIONS_BASED_ON_HISTORY_PROMPT } from './note.constant';

@Injectable()
export class NoteService {
  constructor(
    private readonly prisma: DbService,
    private readonly gemini: GeminiService,
  ) {}

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

  async getNotesByMonth(fullDate: Date, userId: string) {
    const newDate = new Date(fullDate);
    return await this.prisma.note.findMany({
      where: {
        userId,
        day: {
          gte: new Date(
            `${newDate.getFullYear()}-${newDate.getMonth() + 1}-01`,
          ),
          lte: new Date(
            `${newDate.getFullYear()}-${newDate.getMonth() + 1}-31`,
          ),
        },
      },
    });
  }

  async createNote(note: NoteDto, userId: string): Promise<string> {
    return (
      await this.prisma.note.create({
        data: Object.assign(note, { userId }),
      })
    ).id;
  }
  async updateNote(note: NoteDto, userId: string, noteId: string) {
    console.log(note);
    await this.prisma.note.update({
      where: { id: noteId },
      data: {
        title: note.title,
        content: note.content,
        day: note.day,
      },
    });
  }
  async deleteNote(noteId: string) {
    await this.prisma.note.delete({
      where: { id: noteId },
    });
  }
  async getSuggestions(userId: string) {
    const notes = await this.getAllUsersNotes(userId);
    return this.gemini.generateTextWithData(
      SUGGESTIONS_BASED_ON_HISTORY_PROMPT,
      notes,
    );
  }

  async getSuggestionForNote(noteId: string, userId: string) {
    const note = await this.getNote(noteId, userId);
    return this.gemini.generateTextWithData(
      SUGGESTIONS_BASED_ON_HISTORY_PROMPT,
      note,
    );
  }

  async getSuggestionsForMonth(userId: string, date: Date) {
    const notes = await this.getNotesByMonth(date, userId);
    return this.gemini.generateTextWithData(
      SUGGESTIONS_BASED_ON_HISTORY_PROMPT,
      notes,
    );
  }

  async getLatestStreak(userId: string) {
    const notes = await this.getAllUsersNotes(userId);
    const sortedNotes = notes.sort((a, b) => {
      return new Date(b.day).getTime() - new Date(a.day).getTime();
    });
    let streak = 0;
    let currentStreak = 0;
    let lastDay = new Date();
    sortedNotes.forEach((note) => {
      const day = new Date(note.day);
      if (lastDay.getTime() - day.getTime() === 86400000) {
        currentStreak++;
      } else {
        if (currentStreak > streak) {
          streak = currentStreak;
        }
        currentStreak = 0;
      }
      lastDay = day;
    });
    return { currentStreak };
  }
}
