import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GenerativeModel } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  constructor(@Inject() private readonly genAI: GenerativeModel) {}

  async generateText(prompt: string): Promise<string> {
    const result = await this.genAI.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  }

  objectsToArray(objects, key: string) {
    return objects.map((objects) => objects[key]);
  }

  mergePromptWithData(prompt: string, data) {
    return prompt + JSON.stringify(data);
  }

  async generateTextWithData(prompt: string, rawObjects, key?: string) {
    let data = rawObjects;
    if (key) {
      data = this.objectsToArray(rawObjects, key);
    }
    const processedPrompt = this.mergePromptWithData(prompt, data);
    if (data === undefined || (Array.isArray(data) && !data.length)) {
      throw new HttpException('No notes found', HttpStatus.NOT_FOUND);
    }
    return this.generateText(processedPrompt);
  }
}
