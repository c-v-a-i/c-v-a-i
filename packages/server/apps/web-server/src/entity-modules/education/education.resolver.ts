import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EducationService } from './education.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { Education } from '@server/entities';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { GetEducationEntriesByCvArgsType, UpdateEducationEntryArgsType } from './dto';

@UseGuards(GqlAuthGuard)
@Resolver()
export class EducationResolver {
  private readonly logger = new Logger(EducationResolver.name);
  constructor(private readonly educationService: EducationService) {}

  @Query(() => [Education])
  async getEducationEntriesByCv(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() { cvId }: GetEducationEntriesByCvArgsType
  ): Promise<Education[]> {
    return this.educationService.findAll(
      {
        searchParams: { cvId },
      },
      client_id
    );
  }

  @Mutation(() => Boolean)
  async updateEducation(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() data: UpdateEducationEntryArgsType
  ): Promise<boolean> {
    await this.educationService.update({ data }, client_id);
    return true;
  }
}
