import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  day: Date;
}
