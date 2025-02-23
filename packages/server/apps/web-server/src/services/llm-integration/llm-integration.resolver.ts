import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LlmIntegrationService } from './llm-integration.service';

import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { ReviewCvOutput } from './dto';
import { ReviewStatusType } from '../../common/enums';
import { ConvertPdfToCvObjectType } from './dto/convert-pdf-to-cv.object-type';
import { ConvertPdfInput } from './dto/convert-pdf-to-cv.input-type';

@UseGuards(GqlAuthGuard)
@Resolver()
export class LlmIntegrationResolver {
  constructor(private readonly llmIntegrationService: LlmIntegrationService) {}

  @Query(() => ReviewStatusType)
  async getReviewStatus(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<ReviewStatusType> {
    // Use the service to figure out the status
    console.log(`getReviewStatus: cvId: ${cvId}`);
    const statusStr = this.llmIntegrationService.getReviewStatusForUser(userId);
    return ReviewStatusType[statusStr];
  }

  @Mutation(() => ReviewCvOutput)
  async reviewCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<ReviewCvOutput> {
    const { messages } = await this.llmIntegrationService.reviewCv({
      userId,
      cvId,
    });

    return {
      messages,
      // newCvState: newCvObjectType,
    };
  }

  @Mutation(() => ConvertPdfToCvObjectType)
  async convertPdfToCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args() { file }: ConvertPdfInput
  ): Promise<ConvertPdfToCvObjectType> {
    const { createReadStream, mimetype } = await file;

    if (mimetype !== 'application/pdf') {
      throw new Error('Invalid file type');
    }

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      createReadStream()
        .on('data', (chunk: Uint8Array) => chunks.push(chunk))
        .on('error', reject)
        .on('end', () => resolve(Buffer.concat(chunks)));
    });

    const pdfBase64 = pdfBuffer.toString('base64');

    const cv = await this.llmIntegrationService.convertPdfToCv({
      userId,
      pdfBase64,
    });
    return { cv };
  }
}
