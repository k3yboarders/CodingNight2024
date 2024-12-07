import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SleepRecordDto } from './dto/sleep-record.dto';

@Injectable()
export class SleepTrackerService {
  constructor(private readonly prisma: DbService) {}

  async addSleepRecord(data: SleepRecordDto, userId: string) {
    return this.prisma.sleepRecord.create({
      data: {
        from: data.from,
        to: data.to,
        comment: data.comment,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateSleepRecord(data: SleepRecordDto, recordId: string) {
    return this.prisma.sleepRecord.update({
      where: {
        id: recordId,
      },
      data: {
        from: data.from,
        to: data.to,
        comment: data.comment,
      },
    });
  }

  async getSleepRecords(userId: string) {
    return this.prisma.sleepRecord.findMany({
      where: {
        userId,
      },
    });
  }

  async getSleepAnalysis(from: Date, to: Date, userId: string) {
    const analysisFromDb = await this.prisma.sleepAnalysis.findMany({
      where: {
        userId,
        from: from,
        to: to,
      },
    });
    if (!analysisFromDb) {
      //TODO: generate analysis
    }
    return analysisFromDb;
  }

  async deleteSleepRecord(recordId: string) {
    return this.prisma.sleepRecord.delete({
      where: {
        id: recordId,
      },
    });
  }

  async getSleepDataByDay(userId: string, day: Date) {
    const sleepRecord = await this.prisma.sleepRecord.findFirst({
      where: {
        userId,
        to: {
          gte: new Date(day),
        },
      },
      include: {
        user: {
          select: {
            expectedSleepTime: true,
          },
        },
      },
    });
    if (!sleepRecord) {
      return {
        hours: 0,
        expectedSleepTime: 0,
      };
    }
    return {
      ...sleepRecord,
      hours:
        new Date(sleepRecord.to).getHours() -
        new Date(sleepRecord.from).getHours(),
      expectedSleepTime: sleepRecord.user.expectedSleepTime,
    };
  }
}
