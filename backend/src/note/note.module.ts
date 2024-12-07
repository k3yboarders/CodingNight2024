import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { DbModule } from 'src/db/db.module';
import { geminiPlainProvider } from 'src/gemini/gemini-plain.provider';

@Module({
  controllers: [NoteController],
  providers: [NoteService, geminiPlainProvider],
  imports: [DbModule],
})
export class NoteModule {}
