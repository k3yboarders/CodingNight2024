import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsDate()
  day: Date;
}
