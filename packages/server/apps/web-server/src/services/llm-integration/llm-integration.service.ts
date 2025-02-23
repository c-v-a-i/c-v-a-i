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

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { HttpService } from '@nestjs/axios';

const reviewCvResponseFormat = z.object({
  textReview: z
    .array(z.string())
    .describe(
      'array with logically separated parts of the text review response with their content. it should not include any reasoning in it'
    ),
  // score: z.number().min(1).max(10),
  // TODO: "newSchema" OR "changeOperation"
});
type ReviewCvResponseFormat = z.infer<typeof reviewCvResponseFormat>;

// TODO: use actual CV schema (a real object)
const convertPdfToCv = z.object({
  cv: z.string(),
});
type CreateCvOutputSchema = z.infer<typeof convertPdfToCv>;

@Injectable()
export class LlmIntegrationService {
  private model: ChatOpenAI;
  private readonly logger = new Logger(LlmIntegrationService.name);

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
    this.model = new ChatOpenAI({
      apiKey: this.llmServiceConfiguration.openaiApiKey,
      modelName: 'gpt-4o', // or whichever model you want
      maxTokens: 1000,
      maxRetries: 3,
    });
  }

  async convertPdfToCv({
    // userId,
    pdfBase64,
  }: {
    userId: string;
    pdfBase64: string;
  }) /* Promise<CvDocument> */ {
    const pdfServiceUrl = this.llmServiceConfiguration.pdfServiceUrl;
    const { data: pngs } = await this.httpService.axiosRef.post<string[]>(
      `${pdfServiceUrl}/convert`,
      {
        pdf: pdfBase64,
      }
    );

    const cv = await this.processImagesWithLLM(pngs);

    // // 3. Create and save CV document
    // const cv = await this.cvService.createCv({
    //   userId,
    // });
    //
    // return cv;

    return cv;
  }

  private async processImagesWithLLM(pngs: string[]) {
    const visionMessages = new HumanMessage({
      content: [
        {
          type: 'text',
          text: 'Extract structured CV information from this document',
        },
        ...pngs.map((png) => ({
          type: 'image_url',
          image_url: { url: `data:image/png;base64,${png}` },
        })),
      ],
    });

    const structuredModel =
      this.model.withStructuredOutput<CreateCvOutputSchema>(convertPdfToCv);

    const result = await structuredModel.invoke([
      new SystemMessage({ content: this.transformPngToCvFormatSystemPrompt }),
      visionMessages,
    ]);

    return result.cv;
  }

  getReviewStatusForUser(userId: string): ReviewStatusType {
    void userId;
    // Pseudo-logic:
    // 1) Check if user has subscription => otherwise NO_SUBSCRIPTION
    // 2) Check if user has reviews left => otherwise NO_REVIEWS_REMAIN
    // 3) Check if CV was already reviewed => otherwise ALREADY_REVIEWED
    // ... default to "READY_FOR_REVIEW" for now
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

    const structuredModel =
      this.model.withStructuredOutput<ReviewCvResponseFormat>(
        reviewCvResponseFormat
      );

    const humanMessage = ['```', yaml.dump(cv.toJSON()), '```'].join('\n');

    const result = await structuredModel.invoke([
      { role: 'system', content: this.cvReviewSystemPrompt },
      { role: 'user', content: humanMessage },
    ]);

    const newCvState = cv;

    return {
      messages: result.textReview,
      newCvState,
    };
  }
}
