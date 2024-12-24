import { Inject, Injectable, Logger } from '@nestjs/common';
import { CvService } from '../cv/cv.service';
import { CvDocument } from '../../../../../libs/schemas';
import { ReviewStatusType } from '../../common/enums';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigType } from '@nestjs/config';
import { openaiConfig } from '../../auth/config/openai.config';
import { z } from 'zod';
import yaml from 'js-yaml';

const outputSchema = z.object({
  reasoning: z
    .string()
    .describe(
      'contains chatbots reasoning about its actions and the final response (textReview)'
    ),
  textReview: z
    .array(z.string())
    .describe(
      'array with logically separated parts of the text review response with their content. it should not include any reasoning in it'
    ),
  // TODO: "newSchema" OR "changeOperation"
  score: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'A number between 0 and 10 representing an overall score of a CV'
    ),
});

type OutputSchema = z.infer<typeof outputSchema>;

@Injectable()
export class LlmIntegrationService {
  private model: ChatOpenAI;
  private readonly logger = new Logger(LlmIntegrationService.name);

  constructor(
    private readonly cvService: CvService,
    @Inject(openaiConfig.KEY)
    private readonly openaiConfiguration: ConfigType<typeof openaiConfig>
  ) {
    this.model = new ChatOpenAI({
      apiKey: this.openaiConfiguration.openaiApiKey,
      modelName: 'gpt-4o',
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
    // 1) Fetch the current CV from the database
    const cv = await this.cvService.getCv({ cvId, userId });

    const structuredModel = this.model.withStructuredOutput(outputSchema);

    const inputMessage = [
      'You will receive a CV in yaml format',
      `Please, review this CV as if you were a hiring manager and a person who gives the advices about writing CVs.`,

      'You should estimate their experience level and tell what positions a candidate is good for.',
      'Also, you may say what can be improved and why. You should find as many red flags as possible -- as if you were trying to find an imposter.',
      'Other than that, you need to score a candidate. Usually, the maximum score is almost unreachable.',
      'If you dont receive any CV or CV looks like something else, you should state it',

      // 'You should provide a reasoning about your response into an appropriate part of your response',
      // 'The "reasoning" section should come first. It should contain a summarization of a CV. You must also include criteria that define a good engineer (and a good well-written CV)',
      // 'The following is the CV you need to review',
      ['```yaml', yaml.dump(cv.toJSON()), '```'],
    ].join('\n');

    // TODO: create mongo table for this and store the data

    const result: OutputSchema = (await structuredModel.invoke(
      inputMessage
    )) as OutputSchema;

    // TODO: come up with a logic that does CV enhancing. There should be some structured output + we should define a schema for a CV somehow
    const newCvState = cv;

    return {
      messages: result.textReview,
      newCvState,
    };
  }
}
