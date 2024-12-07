import {
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class ChallengeDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limitOfNotes: number;
}
