import { Injectable, Logger } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SleepRecordDto } from './dto/sleep-record.dto';
import { GeminiService } from 'src/gemini/gemini.service';
import { SLEEP_TRACKER_SUGGESTIONS_BASED_ON_HISTORY_PROMPT } from './sleep-tracker.constant';

@Injectable()
export class SleepTrackerService {
  private readonly logger = new Logger(SleepTrackerService.name);
  constructor(
    private readonly prisma: DbService,
    private readonly gemini: GeminiService,
  ) {}

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

  async getSleepAnalysis(
    from: Date,
    to: Date,
    userId: string,
    generate = false,
  ) {
    const analysisFromDb = await this.prisma.sleepAnalysis.findMany({
      where: {
        userId,
        from: from,
        to: to,
      },
    });
    if (!analysisFromDb.length && generate) {
      const sleepRecords = await this.getSleepRecords(userId);
      const sleepRecordsWithoutTrash = sleepRecords.map((record) => {
        return {
          from: new Date(record.from),
          to: new Date(record.to),
          comment: record.comment,
        };
      });
      if (!from && sleepRecordsWithoutTrash[0]) {
        from = sleepRecordsWithoutTrash[0].from;
      }
      if (
        !to &&
        sleepRecordsWithoutTrash[sleepRecordsWithoutTrash.length - 1]
      ) {
        to = sleepRecordsWithoutTrash[sleepRecordsWithoutTrash.length - 1].to;
      }
      const analysis = await this.gemini.generateTextWithData(
        SLEEP_TRACKER_SUGGESTIONS_BASED_ON_HISTORY_PROMPT,
        sleepRecordsWithoutTrash,
      );
      return await this.prisma.sleepAnalysis.create({
        data: {
          userId,
          from,
          to,
          generatedAnalysis: analysis,
        },
      });
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
      hours: Math.abs(
        new Date(sleepRecord.to).getHours() -
          new Date(sleepRecord.from).getHours(),
      ),
      expectedSleepTime: sleepRecord.user.expectedSleepTime,
    };
  }
}
