import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { QuotesModule } from './quotes/quotes.module';
import { ArticleModule } from './article/article.module';
import { NoteModule } from './note/note.module';
import { SettingsModule } from './settings/settings.module';
import { ChallengeModule } from './challenge/challenge.module';
import { SleepTrackerModule } from './sleep-tracker/sleep-tracker.module';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { MessageModule } from './message/message.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    DbModule,
    QuotesModule,
    ArticleModule,
    SettingsModule,
    DailyChallengeModule,
    NoteModule,
    ChallengeModule,
    SleepTrackerModule,
    MessageModule,
  ],
})
export class AppModule {}
