import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
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

  notesToArray(notes: { content: string }[]) {
    return notes.map((note) => note.content);
  }

  mergePromptWithData(prompt: string, data: string[]) {
    return prompt + JSON.stringify(data);
  }

  async generateTextWithNotes(
    prompt: string,
    noteObjects: { content: string }[],
  ) {
    const notes = this.notesToArray(noteObjects);
    const processedPrompt = this.mergePromptWithData(prompt, notes);
    if (!notes.length) {
      throw new HttpException('No notes found', HttpStatus.NOT_FOUND);
    }
    return this.generateText(processedPrompt);
  }
}
