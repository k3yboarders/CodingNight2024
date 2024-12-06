import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { QuotesModule } from './quotes/quotes.module';
import { ArticleModule } from './article/article.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, DbModule, QuotesModule, ArticleModule],
})
export class AppModule {}
