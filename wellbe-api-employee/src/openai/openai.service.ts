import { Injectable } from '@nestjs/common'; // NestJS core import
import { OpenAI } from 'openai'; // Correct import from openai SDK
import { sleep } from 'openai/core';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });
      return (
        response.choices[0]?.message?.content?.trim() ||
        'No response generated.'
      );
    } catch (error) {
      if (error.response?.status === 429) {
        console.error('Rate limit exceeded. Retrying...');
        await sleep(3000); // Wait for 3 seconds before retrying
        return this.generateText(prompt); // Retry the request
      } else {
        console.error('Error generating text:', error);
        throw new Error('Failed to generate text using OpenAI API.');
      }
    }
  }
}
