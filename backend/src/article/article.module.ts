import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { geminiTasksProvider } from 'src/gemini/gemini-tasks.provider';

@Module({
  providers: [ArticleService, geminiTasksProvider],
  controllers: [ArticleController]
})
export class ArticleModule {}
