import { Inject, Injectable, Logger } from '@nestjs/common';
import { CvService } from '../cv/cv.service';
import { ReviewStatusType } from '../../common/enums';
import { ConfigType } from '@nestjs/config';
import { llmServiceConfig } from '../../auth/config/llmServiceConfig';
import {
  cvReviewSystemPrompt,
  transformCvSystemPrompt,
  transformPngToCvFormatSystemPrompt,
} from './system-prompt';
import { HttpService } from '@nestjs/axios';
import { TransformCvInputType } from './dto';
import { WithUserId } from '../../common/types';
import { LlmCommunicationService } from '../llm-communication/llm-communication.service';
import { CvFormatter } from './utils';
import {
  convertPdfToCvResponseFormat,
  reviewCvResponseFormat,
  transformCvResponseFormat,
} from './types';

@Injectable()
export class LlmIntegrationService {
  private readonly logger = new Logger(LlmIntegrationService.name);

  private readonly cvReviewSystemPrompt = cvReviewSystemPrompt;
  private readonly transformPngToCvFormatSystemPrompt =
    transformPngToCvFormatSystemPrompt;
  private readonly transformCvSystemPrompt = transformCvSystemPrompt;

  constructor(
    private readonly cvService: CvService,
    private readonly llmService: LlmCommunicationService,
    private readonly httpService: HttpService,
    @Inject(llmServiceConfig.KEY)
    private readonly llmConfig: ConfigType<typeof llmServiceConfig>
  ) {}

  async convertPdfToCv({
    userId,
    pdfBase64,
  }: WithUserId & { pdfBase64: string }) {
    const { data: pngs } = await this.httpService.axiosRef.post<string[]>(
      `${this.llmConfig.pdfServiceUrl}/convert`,
      { pdf: pdfBase64 }
    );

    const completionParams = {
      systemPrompt: this.transformPngToCvFormatSystemPrompt,
      userContent: [
        {
          type: 'text' as const,
          text: 'Extract structured CV information from this document and DONT LOST ANY INFORMATION',
        },
      ],
      model: 'gpt-4o',
    };
    const { comment, createdCv: createCvPayload } =
      await this.llmService.createStructuredResponse(
        completionParams,
        {
          convertPdfToCvResponseFormat,
        },
        pngs
      );

    if (!createCvPayload) {
      return { comment };
    }

    const cv = await this.cvService.createCv(userId, createCvPayload);
    this.logger.log(`Created CV with ID: ${cv.id}`);

    return {
      comment,
      cv,
    };
  }

  getReviewStatusForUser(userId: string): ReviewStatusType {
    // TODO
    void userId;
    return ReviewStatusType.READY_FOR_REVIEW;
  }

  async reviewCv({ userId, cvId }: WithUserId & { cvId: string }) {
    const cv = await this.cvService.getCv({ cvId, userId });

    const completionParams = {
      systemPrompt: this.cvReviewSystemPrompt,
      userContent: [
        { type: 'text' as const, text: CvFormatter.cvToJsonCodeBlock(cv) },
      ],
      model: 'gpt-4o',
    };
    const result = await this.llmService.createStructuredResponse(
      completionParams,
      { reviewCvResponseFormat }
    );

    return {
      messages: result.messages,
      newCvState: cv,
    };
  }

  async transformCv({
    userId,
    message,
    templateId,
  }: TransformCvInputType & WithUserId) {
    const cv = await this.cvService.getCv({ cvId: templateId, userId });

    const completionParams = {
      systemPrompt: this.transformCvSystemPrompt,
      userContent: [
        { type: 'text' as const, text: CvFormatter.cvToJsonCodeBlock(cv) },
        { type: 'text' as const, text: message },
      ],
      model: 'o3-mini',
    };
    const { cv: newCv, comment } =
      await this.llmService.createStructuredResponse(completionParams, {
        transformCvResponseFormat,
      });

    const createdCvDocument = await this.cvService.createCv(userId, newCv);

    return {
      cv: createdCvDocument,
      comment,
    };
  }
}
