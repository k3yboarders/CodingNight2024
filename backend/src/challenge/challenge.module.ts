import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { geminiChallengeProvider } from 'src/gemini/gemini-challenge.provider';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService, geminiChallengeProvider],
})
export class ChallengeModule {}
