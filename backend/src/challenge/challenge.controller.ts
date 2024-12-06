import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChallengeService } from './challenge.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';

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
}
