import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsDate()
  day: Date;
}
