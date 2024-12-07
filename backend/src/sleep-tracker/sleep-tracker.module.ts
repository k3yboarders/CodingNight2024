import { Module } from '@nestjs/common';
import { SleepTrackerService } from './sleep-tracker.service';
import { SleepTrackerController } from './sleep-tracker.controller';
import { geminiPlainProvider } from 'src/gemini/gemini-plain.provider';

@Module({
  providers: [SleepTrackerService, geminiPlainProvider],
  controllers: [SleepTrackerController]
})
export class SleepTrackerModule {}
