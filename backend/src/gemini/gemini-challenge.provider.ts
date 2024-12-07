import { Injectable, Provider } from '@nestjs/common';
import { GoogleGenerativeAI, ResponseSchema, SchemaType } from '@google/generative-ai';
import { GeminiService } from './gemini.service';
import { env } from 'process';
import { GEMINI_MODEL } from './gemini.constant';

const responseSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    description: { type: SchemaType.STRING },
    points: { type: SchemaType.NUMBER },
  },
};

@Injectable()
export class GeminiChallengeProvider {
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

export const geminiChallengeProvider: Provider = {
  provide: GeminiService,
  useFactory: () => {
    const geminiNoteProvider = new GeminiChallengeProvider();
    return geminiNoteProvider.provide();
  },
};