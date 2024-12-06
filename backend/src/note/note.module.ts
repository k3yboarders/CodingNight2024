import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [DbModule],
})
export class NoteModule {}
