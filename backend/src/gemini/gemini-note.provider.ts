import { Injectable, Provider } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiService } from './gemini.service';
import { env } from 'process';
import { GEMINI_MODEL } from './gemini.constant';


@Injectable()
export class GeminiNoteProvider {
  constructor() {}

  provide(): GeminiService {
      const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
      });
    return new GeminiService(model);
  }
}

export const geminiNoteProvider: Provider = {
  provide: GeminiService,
  useFactory: () => {
    const geminiNoteProvider = new GeminiNoteProvider();
    return geminiNoteProvider.provide();
  },
};