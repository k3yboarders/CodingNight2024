import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { SleepRecordDto } from './dto/sleep-record.dto';
import { SleepTrackerService } from './sleep-tracker.service';

@UseGuards(AuthGuard('jwt'))
@Controller('sleep-tracker')
export class SleepTrackerController {
  constructor(private readonly sleepTrackerService: SleepTrackerService) {}

  @Post()
  async addSleepRecord(
    @Body() data: SleepRecordDto,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.sleepTrackerService.addSleepRecord(data, user.userId);
  }

  @Put(':id')
  async updateSleepRecord(
    @Body() data: SleepRecordDto,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.sleepTrackerService.updateSleepRecord(data, user.userId);
  }

  @Get('analysis')
  async getSleepAnalysis(
    @GetUser() user: JwtAuthDto,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    return this.sleepTrackerService.getSleepAnalysis(from, to, user.userId);
  }

  @Delete(':id')
  async deleteSleepRecord(@GetUser() user: JwtAuthDto) {
    return this.sleepTrackerService.deleteSleepRecord(user.userId);
  }

  @Get('day/:date')
  async getSleepRecordsForDay(
    @GetUser() user: JwtAuthDto,
    @Param('date') date: Date,
  ) {
    return this.sleepTrackerService.getSleepDataByDay(user.userId, date);
  }
}
