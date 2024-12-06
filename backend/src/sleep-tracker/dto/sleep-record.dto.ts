import { IsDate, IsOptional, IsString } from 'class-validator';

export class SleepRecordDto {
  @IsDate()
  from: Date;

  @IsDate()
  to: Date;

  @IsString()
  @IsOptional()
  comment: string;
}
