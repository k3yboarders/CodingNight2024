import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsUUID()
  receiverId: string;
  @IsUUID()
  chatId: string;
}
