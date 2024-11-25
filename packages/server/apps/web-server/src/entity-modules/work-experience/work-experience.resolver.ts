import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkExperienceService } from './work-experience.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { WorkExperience } from '@server/entities';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { GetWorkExperienceEntriesArgsType, UpdateWorkExperienceEntryArgsType } from './dto';

@UseGuards(GqlAuthGuard)
@Resolver()
export class WorkExperienceResolver {
  private readonly logger = new Logger(WorkExperienceResolver.name);
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Query(() => [WorkExperience])
  async getWorkExperienceEntries(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() { cvId }: GetWorkExperienceEntriesArgsType
  ): Promise<WorkExperience[]> {
    return this.workExperienceService.findAll(
      {
        searchParams: { cvId },
      },
      client_id
    );
  }

  @Mutation(() => Boolean)
  async updateWorkExperience(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() data: UpdateWorkExperienceEntryArgsType
  ): Promise<boolean> {
    await this.workExperienceService.update({ data }, client_id);
    return true;
  }
}
