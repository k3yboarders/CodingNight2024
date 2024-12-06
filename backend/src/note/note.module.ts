import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { DbModule } from 'src/db/db.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [DbModule, GeminiModule],
})
export class NoteModule {}
