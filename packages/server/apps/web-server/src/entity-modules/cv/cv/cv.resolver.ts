import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CvService } from './cv.service';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guards/gql-auth/gql-auth.guard';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CurrentUser } from '../../../common/decorators';
import { DecodedUserObjectType } from '../../../auth/dto';
import { DataloaderService } from '../../../core/dataloader/dataloader.service';
import { PaginatedCvObjectType } from './dto/paginated-cv.object-type';
import { GenerateCvFromTemplateArgsType } from './dto/generate-cv-from-template.args-type';
import { DeleteCvArgsType } from './dto/delete-cv.args-type';
import { ContactInfo, Education, Project, Skill, WorkExperience } from '@server/entities';
import { CvEntryUnion, GetCvArgsType } from './dto';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';
import { GenerateNewEntryItemArgsType } from './dto/generate-new-entry-item.args-type';

@UseGuards(GqlAuthGuard)
@Resolver(() => CV)
export class CvResolver {
  private readonly logger = new Logger(CvResolver.name);
  constructor(
    private readonly cvService: CvService,
    private readonly dataloaderService: DataloaderService
  ) {}

  @Query(() => PaginatedCvObjectType)
  async getCvs(@CurrentUser() user: DecodedUserObjectType): Promise<PaginatedCvObjectType> {
    const [items, count] = await this.cvService.findAllByUserAndCount(user.client_id);
    return { items, count };
  }

  @Query(() => CV)
  async getCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args()
    { id }: GetCvArgsType
  ): Promise<CV> {
    return this.cvService.findOne({ id, userId });
  }

  @Mutation(() => CV)
  async createNewCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args()
    { templateId }: GenerateCvFromTemplateArgsType
  ): Promise<CV> {
    if (templateId) {
      return this.cvService.generateCvFromTemplate({ userId, templateId });
    }

    return this.cvService.generateExampleCv({
      userId,
    });
  }

  @Mutation(() => Boolean)
  async deleteCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args()
    { id }: DeleteCvArgsType
  ): Promise<boolean> {
    return this.cvService.removeOne({ id, userId });
  }

  // TODO: add checks ensuring cvID belongs to the authenticated user
  @Mutation(() => CvEntryUnion)
  async generateNewEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args()
    { cvId, type }: GenerateNewEntryItemArgsType
  ): Promise<typeof CvEntryUnion> {
    return this.cvService.generateNewEntryItem({
      type,
      cvId,
      userId,
    });
  }

  // we wanna make it more granular introducing different resolvers for each entity CV consists of
  // @Mutation(() => Boolean)
  // async updateCv(
  //   @CurrentUser() { client_id }: DecodedUserObjectType,
  //   @Args()
  //   data: UpdateCvArgsType
  // ): Promise<boolean> {
  //   await this.cvService.update(
  //     {
  //       data,
  //     },
  //     client_id
  //   );
  //   return true;
  // }

  // TODO: I don't wanna create services for each of these entities, because
  //  in the future, I'll probably gonna get rid for all of this
  //  substituting these entries with just some cool entry gigachad table,
  //  That's capable of being anything.
  @ResolveField(() => [Education])
  async educationEntries(@Parent() { id }: CV) {
    return this.dataloaderService.educationLoader.load(id);
  }

  @ResolveField(() => [WorkExperience])
  async workExperienceEntries(@Parent() { id }: CV): Promise<WorkExperience[]> {
    return this.dataloaderService.workExperienceLoader.load(id);
  }

  @ResolveField(() => [Project])
  async projectEntries(@Parent() { id }: CV): Promise<Project[]> {
    return this.dataloaderService.projectLoader.load(id);
  }

  @ResolveField(() => [Skill])
  async skillEntries(@Parent() { id }: CV): Promise<Skill[]> {
    return this.dataloaderService.skillLoader.load(id);
  }

  @ResolveField(() => ContactInfo)
  async contactInfo(@Parent() { id }: CV): Promise<ContactInfo> {
    return this.dataloaderService.contactInfoLoader.load(id);
  }

  @ResolveField(() => AboutMe)
  async aboutMe(@Parent() { id }: CV): Promise<AboutMe> {
    return this.dataloaderService.aboutMeLoader.load(id);
  }

  // @Mutation(() => CV)
  // async createCV(@CurrentUser() user: DecodedUserObjectType, @Args('input') input: CreateCvInput): Promise<CV> {
  //   return this.cvService.createCv(user.client_id, input);
  // }

  // @ResolveField(() => User)
  // async user(@Parent() cv: CV) {
  //   return this.dataloaderService.userLoader.load(cv.userId);
  // }
}
