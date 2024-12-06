import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [AuthModule, DbModule],
})
export class AppModule {}
