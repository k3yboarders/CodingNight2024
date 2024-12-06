import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
