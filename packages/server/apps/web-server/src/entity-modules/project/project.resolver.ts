import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { Project } from '@server/entities';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { GetProjectEntriesArgsType, UpdateProjectEntryArgsType } from './dto';

@UseGuards(GqlAuthGuard)
@Resolver()
export class ProjectResolver {
  private readonly logger = new Logger(ProjectResolver.name);
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async getProjectEntries(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() { cvId }: GetProjectEntriesArgsType
  ): Promise<Project[]> {
    return this.projectService.findAll(
      {
        searchParams: { cvId },
      },
      client_id
    );
  }

  @Mutation(() => Boolean)
  async updateProject(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() data: UpdateProjectEntryArgsType
  ): Promise<boolean> {
    await this.projectService.update({ data }, client_id);
    return true;
  }
}
