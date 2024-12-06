import { Role } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class JwtAuthDto {
  @IsNotEmpty()
  @IsInt()
  userId: string;

  @IsEnum(Role)
  role: Role;
}
