import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { SettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: DbService) {}
  async updateSettings(userId: string, settings: SettingsDto): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        username: settings.username,
        email: settings.email,
        expectedSleepTime: settings.expectedSleepTime,
      },
    });
  }

  async updateAvatar(
    avatarFile: Express.Multer.File,
    userId: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarFile.buffer },
    });
  }

  async getSettings(userId: string): Promise<object> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        expectedSleepTime: true,
      },
    });
  }

  async getAvatar(userId: string): Promise<Buffer | null> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: userId },
        select: { avatar: true },
      })
      .then((user) => user.avatar);
  }
}
