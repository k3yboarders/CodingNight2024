import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DailyChallengeService } from './daily-challenge.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('daily-challenge')
export class DailyChallengeController {
  constructor(private readonly dailyChallengeService: DailyChallengeService) {}

  @Get('streak')
  async getStreak(@GetUser() user: JwtAuthDto) {
    return await this.dailyChallengeService.getDailyChallengesStreak(
      user.userId,
    );
  }

  @Get(':date')
  async getDailyChallenge(@Param('date') date: Date) {
    return await this.dailyChallengeService.getDailyChallenge(date);
  }

  @Get('complete/:id')
  async completeDailyChallenge(
    @GetUser() user: JwtAuthDto,
    @Param('id') dailyChallengeId: string,
  ) {
    return await this.dailyChallengeService.completeDailyChallenge(
      user.userId,
      dailyChallengeId,
    );
  }
}
