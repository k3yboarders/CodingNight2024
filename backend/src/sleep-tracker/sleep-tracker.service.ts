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
}