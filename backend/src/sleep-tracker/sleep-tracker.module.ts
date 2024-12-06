import { Module } from '@nestjs/common';
import { SleepTrackerService } from './sleep-tracker.service';
import { SleepTrackerController } from './sleep-tracker.controller';

@Module({
  providers: [SleepTrackerService],
  controllers: [SleepTrackerController]
})
export class SleepTrackerModule {}
