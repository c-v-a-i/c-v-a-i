import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { llmServiceConfig } from '../../auth/config/llmServiceConfig';
import { ConfigType } from '@nestjs/config';
import { ZodSchema } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

@Injectable()
export class LlmCommunicationService {
  private openai: OpenAI;

  constructor(
    @Inject(llmServiceConfig.KEY)
    private readonly llmConfig: ConfigType<typeof llmServiceConfig>
  ) {
    this.openai = new OpenAI({
      apiKey: this.llmConfig.openaiApiKey,
    });
  }

  async createStructuredResponse<T>(
    params: {
      systemPrompt: string;
      userContent: OpenAI.ChatCompletionContentPart[];
      model: string;
    },
    responseSchemaObject: Record<string, ZodSchema<T>>,
    images?: string[]
  ): Promise<T> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: params.systemPrompt },
      {
        role: 'user',
        content: [
          ...params.userContent,
          ...(images ? this.createImageMessages(images) : []),
        ],
      },
    ];

    const [responseSchemaName, responseSchema] =
      Object.entries(responseSchemaObject)[0];

    const response = await this.openai.beta.chat.completions.parse({
      model: params.model,
      messages,
      response_format: zodResponseFormat(responseSchema, responseSchemaName),
    });

    return response.choices[0].message.parsed as T;
  }

  private createImageMessages(
    images: string[]
  ): OpenAI.ChatCompletionContentPartImage[] {
    return images.map((png) => ({
      type: 'image_url',
      image_url: { url: `data:image/png;base64,${png}` },
    }));
  }
}
