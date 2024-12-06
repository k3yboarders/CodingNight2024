import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class QuotesService {
  constructor(private readonly dbService: DbService) {}

  async getRandomQuote() {
    return this.dbService.quote.findFirst({
      orderBy: { id: 'asc' },
      skip: Math.floor(Math.random() * 14),
    });
  }
}
