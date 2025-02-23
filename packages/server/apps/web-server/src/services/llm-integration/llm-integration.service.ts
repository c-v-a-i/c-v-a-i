import { Inject, Injectable, Logger } from '@nestjs/common';
import { CvService } from '../cv/cv.service';
import { CvDocument } from '../../../../../libs/schemas';
import { ReviewStatusType } from '../../common/enums';
import { ConfigType } from '@nestjs/config';
import { openaiConfig } from '../../auth/config/openai.config';
import { systemPrompt } from './system-prompt';

import { z } from 'zod';
import yaml from 'js-yaml';

import { ChatOpenAI } from '@langchain/openai';

const outputSchema = z.object({
  textReview: z
    .array(z.string())
    .describe(
      'array with logically separated parts of the text review response with their content. it should not include any reasoning in it'
    ),
  // score: z.number().min(1).max(10),
  // TODO: "newSchema" OR "changeOperation"
});

type OutputSchema = z.infer<typeof outputSchema>;

@Injectable()
export class LlmIntegrationService {
  private model: ChatOpenAI;
  private readonly logger = new Logger(LlmIntegrationService.name);

  private readonly systemPrompt = systemPrompt;

  constructor(
    private readonly cvService: CvService,
    @Inject(openaiConfig.KEY)
    private readonly openaiConfiguration: ConfigType<typeof openaiConfig>
  ) {
    this.model = new ChatOpenAI({
      apiKey: this.openaiConfiguration.openaiApiKey,
      modelName: 'gpt-4o', // or whichever model you want
      maxTokens: 1000,
      maxRetries: 3,
    });
  }

  getReviewStatusForUser(userId: string): ReviewStatusType {
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

    const structuredModel = this.model.withStructuredOutput(outputSchema);

    const humanMessage = ['```', yaml.dump(cv.toJSON()), '```'].join('\n');

    const result: OutputSchema = (await structuredModel.invoke([
      { role: 'system', content: this.systemPrompt },
      { role: 'user', content: humanMessage },
    ])) as OutputSchema;

    const newCvState = cv;

    return {
      messages: result.textReview,
      newCvState,
    };
  }
}
