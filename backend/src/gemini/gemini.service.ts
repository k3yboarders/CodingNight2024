import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'process';

@Injectable()
export class GeminiService {
  private readonly genAI: GenerativeModel;
  constructor() {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    this.genAI = genAI.getGenerativeModel({
      model: env.GEMINI_MODEL,
    });
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.genAI.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }
}
