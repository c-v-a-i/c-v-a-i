import { Inject, Injectable, Logger } from '@nestjs/common';
import { CvService } from '../cv/cv.service';
import { CvDocument } from '../../../../../libs/schemas';
import { ReviewStatusType } from '../../common/enums';
import { ConfigType } from '@nestjs/config';
import { llmServiceConfig } from '../../auth/config/llmServiceConfig';
import {
  cvReviewSystemPrompt,
  transformPngToCvFormatSystemPrompt,
} from './system-prompts';
import { z } from 'zod';
import yaml from 'js-yaml';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { HttpService } from '@nestjs/axios';
import { createCreateCvParamsSchema } from '../cv/create-cv-params';
import { convertCvToObjectType } from '../cv/dto';

const reviewCvResponseFormat = z.object({
  textReview: z
    .array(z.string())
    .describe(
      'array with logically separated parts of the text review response with their content. it should not include any reasoning in it'
    ),
});
type ReviewCvResponseFormat = z.infer<typeof reviewCvResponseFormat>;

const convertPdfToCv = z.object({
  createdCv: createCreateCvParamsSchema.optional(),
  comment: z.string(),
});
type CreateCvOutputSchema = z.infer<typeof convertPdfToCv>;

@Injectable()
export class LlmIntegrationService {
  private readonly logger = new Logger(LlmIntegrationService.name);
  private openai: OpenAI;

  private readonly cvReviewSystemPrompt = cvReviewSystemPrompt;
  private readonly transformPngToCvFormatSystemPrompt =
    transformPngToCvFormatSystemPrompt;

  constructor(
    private readonly cvService: CvService,
    @Inject(llmServiceConfig.KEY)
    private readonly llmServiceConfiguration: ConfigType<
      typeof llmServiceConfig
    >,
    private readonly httpService: HttpService
  ) {
    this.openai = new OpenAI({
      apiKey: this.llmServiceConfiguration.openaiApiKey,
    });
  }

  async convertPdfToCv({
    userId,
    pdfBase64,
  }: {
    userId: string;
    pdfBase64: string;
  }) {
    const pdfServiceUrl = this.llmServiceConfiguration.pdfServiceUrl;
    const { data: pngs } = await this.httpService.axiosRef.post<string[]>(
      `${pdfServiceUrl}/convert`,
      { pdf: pdfBase64 }
    );

    const { comment, createdCv: createCvPayload } =
      await this.processImagesWithLLM(pngs);

    if (!createCvPayload) {
      return { comment };
    }

    const cv = await this.cvService.createCv(userId, createCvPayload);
    this.logger.log(`Created CV with ID: ${cv.id}`);

    return {
      comment,
      cv: convertCvToObjectType(cv),
    };
  }

  private async processImagesWithLLM(pngs: string[]) {
    const pngMessages: OpenAI.ChatCompletionContentPartImage[] = pngs.map(
      (png) => ({
        type: 'image_url',
        image_url: { url: `data:image/png;base64,${png}` },
      })
    );

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.transformPngToCvFormatSystemPrompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Extract structured CV information from this document',
          },
          ...pngMessages,
        ],
      },
    ];

    const response = await this.openai.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages,
      response_format: zodResponseFormat(convertPdfToCv, 'convertPdfToCv'),
    });

    return response.choices[0].message.parsed as CreateCvOutputSchema;
  }

  getReviewStatusForUser(userId: string): ReviewStatusType {
    void userId;
    return ReviewStatusType.READY_FOR_REVIEW;
  }

  async reviewCv({
    userId,
    cvId,
  }: {
    userId: string;
    cvId: string;
  }): Promise<{ messages: string[]; newCvState: CvDocument }> {
    const cv = await this.cvService.getCv({ cvId, userId });

    const humanMessage = ['```', yaml.dump(cv.toJSON()), '```'].join('\n');

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: this.cvReviewSystemPrompt },
      { role: 'user', content: humanMessage },
    ];

    const response = await this.openai.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages,
      response_format: zodResponseFormat(
        reviewCvResponseFormat,
        'reviewCvResponse'
      ),
    });

    const result = response.choices[0].message.parsed as ReviewCvResponseFormat;

    return {
      messages: result.textReview,
      newCvState: cv,
    };
  }
}
