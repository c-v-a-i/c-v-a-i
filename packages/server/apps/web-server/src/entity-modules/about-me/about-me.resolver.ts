import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AboutMeService } from './about-me.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { DecodedUserObjectType } from '../../auth/dto';
import { CurrentUser } from '../../common/decorators';
import { GetAboutMeEntriesByCvArgsType, UpdateAboutMeEntryArgsType } from './dto';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@UseGuards(GqlAuthGuard)
@Resolver()
export class AboutMeResolver {
  private readonly logger = new Logger(AboutMeResolver.name);
  constructor(private readonly aboutMeService: AboutMeService) {}

  @Query(() => AboutMe)
  async getAboutMe(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() { cvId }: GetAboutMeEntriesByCvArgsType
  ): Promise<AboutMe> {
    return this.aboutMeService.findOne(
      {
        searchParams: { cvId },
      },
      client_id
    );
  }

  @Mutation(() => Boolean)
  async updateAboutMe(
    @CurrentUser() { client_id }: DecodedUserObjectType,
    @Args() data: UpdateAboutMeEntryArgsType
  ): Promise<boolean> {
    await this.aboutMeService.update({ data }, client_id);
    return true;
  }
}
