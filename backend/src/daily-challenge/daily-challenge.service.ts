import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DailyChallengeService {
  constructor(private readonly prisma: DbService) {}

  async getDailyChallenge(date: Date) {
    const day = new Date(date);
    console.log(day);
    const data = await this.prisma.dailyChallenge.findFirst({
      where: {
        day: {
          gte: new Date(`${day.getFullYear()}-${day.getMonth() + 1}-01`),
          lte: new Date(`${day.getFullYear()}-${day.getMonth() + 1}-31`),
        },
      },
      include: { UserDailyChallenge: true },
    });
    return data
      ? {
          ...data,
          isCompleted: data.UserDailyChallenge.length > 0 ? true : false,
        }
      : {
          message: 'No daily challenge found for this date',
        };
  }

  async completeDailyChallenge(userId: string, dailyChallengeId: string) {
    await this.prisma.userDailyChallenge.create({
      data: { userId, dailyChallengeId },
    });
  }

  async getDailyChallengesStreak(userId: string) {
    const dailyChallenges = await this.prisma.userDailyChallenge.findMany({
      where: { userId },
      include: { dailyChallenge: true },
    });
    const sortedDailyChallenges = dailyChallenges.sort((a, b) => {
      return (
        new Date(b.dailyChallenge.day).getTime() -
        new Date(a.dailyChallenge.day).getTime()
      );
    });
    if (
      dailyChallenges.length === 1 &&
      new Date(dailyChallenges[0].dailyChallenge.day).getDate() ===
        new Date().getDate()
    ) {
      return { currentStreak: 1 };
    }
    let streak = 0;
    let currentStreak = 0;
    let lastDay = new Date();
    sortedDailyChallenges.forEach((dailyChallenge) => {
      const day = new Date(dailyChallenge.dailyChallenge.day);
      if (lastDay.getTime() - day.getTime() === 86400000) {
        currentStreak++;
      } else {
        if (currentStreak > streak) {
          streak = currentStreak;
        }
        currentStreak = 0;
      }
      lastDay = day;
    });
    return { currentStreak };
  }
}
