import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DailyChallengeService } from './daily-challenge.service';
import { AuthGuard } from '@nestjs/passport';
import { DailyChallengeDto } from './dto/daily-challenge.dto';
import { PsychologistGuard } from 'src/auth/guards/psychologist.guard';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('daily-challenge')
export class DailyChallengeController {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  @Get('/:date')
  async getDailyChallenge(@Param('date') date: Date) {
    return await this.dailyChallengeService.getDailyChallenge(date);
  }

  @UseGuards(PsychologistGuard)
  @Post()
  async createDailyChallenge(@Body() dailyChallenge: DailyChallengeDto) {
    return await this.dailyChallengeService.createDailyChallenge(
      dailyChallenge,
    );
  }

  @UseGuards(PsychologistGuard)
  @Delete('/:id')
  async deleteDailyChallenge(@Param('id') dailyChallengeId: string) {
    return await this.dailyChallengeService.deleteDailyChallenge(
      dailyChallengeId,
    );
  }

  @UseGuards(PsychologistGuard)
  @Put('/:id')
  async updateDailyChallenge(
    @Body() dailyChallenge: DailyChallengeDto,
    @Param('id') dailyChallengeId: string,
    @GetUser() user: JwtAuthDto,
  ) {
    return await this.dailyChallengeService.updateDailyChallenge(
      dailyChallenge,
      user.userId,
      dailyChallengeId,
    );
  }
}
