import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: DbService) {}

  async getAllUsersChallenges(userId: string) {
    return await this.prisma.challenge.findMany({
      where: {
        receiverId: userId,
      },
    });
  }

  async getUsersChallenge(userId: string, challengeId: string) {
    return await this.prisma.challenge.findUnique({
      where: {
        id: challengeId,
        receiverId: userId,
      },
    });
  }
}
