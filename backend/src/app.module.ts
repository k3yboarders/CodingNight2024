import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, DbModule, QuotesModule],
})
export class AppModule {}
