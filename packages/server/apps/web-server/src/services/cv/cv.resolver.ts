import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { CvService } from './cv.service';
import {
  convertCvToObjectType,
  CvEntryType,
  CvEntryUnion,
  CvObjectType,
  isCvPropertyItemizedEntry,
  UpdateCvInput,
} from './dto';
import {
  AboutMe,
  ContactInfo,
  Cv,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '../../../../../libs/schemas';
import { Document } from 'mongoose';

@UseGuards(GqlAuthGuard)
@Resolver(() => CvObjectType)
export class CvResolver {
  private readonly logger = new Logger(CvResolver.name);

  constructor(private readonly cvService: CvService) {}

  private convertToSerializableType = (property: Cv[keyof Cv]) => {
    if (isCvPropertyItemizedEntry(property)) {
      const values = [...property.values()];
      return Array.from(
        values.map((p) => p.toObject() as Omit<typeof p, keyof Document>)
      );
    }
    return typeof property === 'string'
      ? property
      : (property?.toObject() as Omit<typeof property, keyof Document>);
  };

  @Query(() => [CvObjectType])
  async getCvs(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType
  ): Promise<CvObjectType[]> {
    const cvs = await this.cvService.getCvs({ userId });
    return cvs.map(convertCvToObjectType);
  }

  @Query(() => CvObjectType)
  async getCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<CvObjectType> {
    const cv = await this.cvService.getCv({ cvId, userId });
    return convertCvToObjectType(cv);
  }

  @ResolveField(() => AboutMe, { nullable: true })
  async aboutMe(@Parent() { _id }: CvObjectType): Promise<AboutMe | undefined> {
    return this.cvService.getTopLevelProperty(_id, 'aboutMe');
  }

  @ResolveField(() => ContactInfo, { nullable: true })
  async contactInfo(
    @Parent() { _id }: CvObjectType
  ): Promise<ContactInfo | undefined> {
    return this.cvService.getTopLevelProperty(_id, 'contactInfo');
  }

  @ResolveField(() => [WorkExperience], { nullable: true })
  async workExperienceEntries(
    @Parent() { _id }: CvObjectType
  ): Promise<WorkExperience[] | undefined> {
    const entries = await this.cvService.getTopLevelProperty(
      _id,
      'workExperienceEntries'
    );
    if (!entries) {
      return undefined;
    }
    return [...entries.values()].map((e) => e.toObject() as WorkExperience);
  }

  @ResolveField(() => [Project], { nullable: true })
  async projectEntries(
    @Parent() { _id }: CvObjectType
  ): Promise<Project[] | undefined> {
    const entries = await this.cvService.getTopLevelProperty(
      _id,
      'projectEntries'
    );
    if (!entries) {
      return undefined;
    }
    return [...entries.values()].map((e) => e.toObject() as Project);
  }

  @ResolveField(() => [Education], { nullable: true })
  async educationEntries(
    @Parent() { _id }: CvObjectType
  ): Promise<Education[] | undefined> {
    const entries = await this.cvService.getTopLevelProperty(
      _id,
      'educationEntries'
    );
    if (!entries) {
      return undefined;
    }
    return [...entries.values()].map((e) => e.toObject() as Education);
  }

  @ResolveField(() => [Skill], { nullable: true })
  async skillEntries(
    @Parent() { _id }: CvObjectType
  ): Promise<Skill[] | undefined> {
    const entries = await this.cvService.getTopLevelProperty(
      _id,
      'skillEntries'
    );
    if (!entries) {
      return undefined;
    }
    return [...entries.values()].map((e) => e.toObject() as Skill);
  }

  @Mutation(() => CvObjectType)
  async createNewCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('templateId', { type: () => ID }) templateId: string
  ): Promise<CvObjectType> {
    const cv = templateId
      ? await this.cvService.generateCvFromTemplate({
          userId,
          cvId: templateId,
        })
      : await this.cvService.generateExampleCv({ userId });
    return convertCvToObjectType(cv);
  }

  @Mutation(() => Boolean)
  async deleteCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<boolean> {
    return this.cvService.deleteCv({ cvId, userId });
  }

  // given a cv entry type name, generate a "dummy" item so it can then be changed
  @Mutation(() => CvEntryUnion)
  async generateNewEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryType', { type: () => CvEntryType }) entryType: CvEntryType
  ): Promise<typeof CvEntryUnion> {
    return this.cvService.generateNewEntryItem({
      entryType,
      cvId,
      userId,
    });
  }

  @Mutation(() => Boolean)
  async deleteEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryType', { type: () => CvEntryType }) entryType: CvEntryType,
    @Args('entryItemId', { type: () => ID }) entryItemId: string
  ) {
    return this.cvService.deleteEntryItem({
      userId,
      entryItemId,
      cvId,
      entryType,
    });
  }

  @Mutation(() => CvObjectType)
  async updateCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('data', { type: () => UpdateCvInput }) data: UpdateCvInput
  ): Promise<CvObjectType> {
    // fixes "Cannot convert object to primitive type" error
    data = JSON.parse(JSON.stringify(data));
    const cv = await this.cvService.updateCv({
      cvId,
      data,
      userId,
    });
    return convertCvToObjectType(cv);
  }

  @Mutation(() => Boolean)
  async deleteCvEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryItemId', { type: () => ID }) entryItemId: string,
    @Args('entryType', { type: () => CvEntryType }) entryType: CvEntryType
  ): Promise<boolean> {
    await this.cvService.deleteEntryItem({
      cvId,
      userId,
      entryType,
      entryItemId,
    });
    return true;
  }
}
