import { Injectable, Provider } from '@nestjs/common';
import { GoogleGenerativeAI, ResponseSchema, SchemaType } from '@google/generative-ai';
import { GeminiService } from './gemini.service';
import { env } from 'process';
import { GEMINI_MODEL } from './gemini.constant';

const responseSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: { type: SchemaType.STRING },
};

@Injectable()
export class GeminiTasksProvider {
  constructor() {}

  provide(): GeminiService {
      const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema
      },
      });
    return new GeminiService(model);
  }
}

export const geminiTasksProvider: Provider = {
  provide: GeminiService,
  useFactory: () => {
    const geminiNoteProvider = new GeminiTasksProvider();
    return geminiNoteProvider.provide();
  },
};