import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ChallengeDto } from './dto/challenge.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { CHALLENGE_BASED_ON_HISTORY_PROMPT } from './challenge.constant';

@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: DbService, private readonly gemini: GeminiService) {}

  async getAllUsersChallenges(userId: string) {
    return await this.prisma.challenge.findMany({
      where: {
        receiverId: userId,
      },
    })
  }

  async getUsersChallenge(userId: string, challengeId: string) {
    return await this.prisma.challenge.findUnique({
      where: {
        id: challengeId,
        receiverId: userId,
      },
    });
  }

  async createUserChallange(userId: string, challenge: ChallengeDto) {
    const limit= challenge.limitOfNotes ? challenge.limitOfNotes : 7;
    const notes = await this.prisma.note.findMany({
      where: { userId },
      take: limit
    });
    const rawChallenge = await this.gemini.generateTextWithNotes(CHALLENGE_BASED_ON_HISTORY_PROMPT, notes);
    const newChallenge = JSON.parse(rawChallenge);
    await this.prisma.challenge.create({
      data: {
        receiverId:userId,
        description: newChallenge.description,
        title: newChallenge.title,
        score: newChallenge.points,
      }
    });
  }
}
