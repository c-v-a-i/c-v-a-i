import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LlmIntegrationService } from './llm-integration.service';

import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { ReviewCvOutput } from './dto';
import { ReviewStatusType } from '../../common/enums';

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
    const { messages, newCvState } = await this.llmIntegrationService.reviewCv({
      userId,
      cvId,
    });

    return {
      messages,
      // newCvState: newCvObjectType,
    };
  }
}
