import { Injectable } from '@nestjs/common';
import { DailyChallengeDto } from './dto/daily-challenge.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DailyChallengeService {
  constructor(private readonly prisma: DbService) {}

  async createDailyChallenge(dailyChallenge: DailyChallengeDto) {
    const allUsers = await this.prisma.dailyChallenge.findMany({
      select: { id: true },
    });
    await this.prisma.dailyChallenge.create({
      data: Object.assign(dailyChallenge, {
        userDailyChallenge: {
          connect: allUsers.map((user) => ({ userId: user.id })),
        },
      }),
    });
  }

  async getDailyChallenge(date: Date) {
    return await this.prisma.dailyChallenge.findFirst({
      where: { day: date },
    });
  }

  async updateDailyChallenge(
    dailyChallenge: DailyChallengeDto,
    userId: string,
    dailyChallengeId: string,
  ) {
    const allUsers = await this.prisma.dailyChallenge.findMany({
      select: { id: true },
    });
    await this.prisma.dailyChallenge.update({
      where: { id: dailyChallengeId },
      data: Object.assign(dailyChallenge, {
        userDailyChallenge: {
          connect: allUsers.map((user) => ({ userId: user.id })),
        },
      }),
    });
  }

  async deleteDailyChallenge(dailyChallengeId: string) {
    await this.prisma.dailyChallenge.delete({
      where: { id: dailyChallengeId },
    });
  }
}
