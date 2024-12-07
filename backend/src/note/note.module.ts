import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { DbModule } from 'src/db/db.module';
import { geminiNoteProvider } from 'src/gemini/gemini-note.provider';

@Module({
  controllers: [NoteController],
  providers: [NoteService, geminiNoteProvider],
  imports: [DbModule],
})
export class NoteModule {}
