import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChallengeService } from './challenge.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { ChallengeDto } from './dto/challenge.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  async getAllUsersChallenges(@GetUser() user: JwtAuthDto) {
    return await this.challengeService.getAllUsersChallenges(user.userId);
  }

  @Get('/:id')
  async getUsersChallenge(
    @GetUser() user: JwtAuthDto,
    @Param('id') challengeId: string,
  ) {
    return await this.challengeService.getUsersChallenge(
      user.userId,
      challengeId,
    );
  }

  @Post()
  async createChallenge(@GetUser() user: JwtAuthDto, @Body() challenge: ChallengeDto) {
    return await this.challengeService.createUserChallange(user.userId, challenge);
  }
}
