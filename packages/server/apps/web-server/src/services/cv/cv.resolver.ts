import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { CvService } from './cv.service';
import {
  CvEntryType,
  CvObjectType,
  UpdateCvInput,
  GenerateNewEntryItemObjectType,
} from './dto';

// type EntryResolverConfig = {
//   fieldName: keyof CvObjectType;
//   returnType: ReturnTypeFunc; // () => ItemizedEntryItem[];
//   propertyName: keyof CvData;
// };

@UseGuards(GqlAuthGuard)
@Resolver(() => CvObjectType)
export class CvResolver {
  constructor(private readonly cvService: CvService) {
    // CvResolver.entryResolvers.forEach((config) => {
    //   this.createEntryResolver(config);
    // });
  }

  @Query(() => [CvObjectType])
  async getCvs(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType
  ): Promise<CvObjectType[]> {
    return this.cvService.getCvs({ userId });
  }

  @Query(() => CvObjectType)
  async getCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<CvObjectType> {
    return this.cvService.getCv({ cvId, userId });
  }

  // private async getEntries<T extends keyof CvData>(
  //   cvId: string,
  //   propertyName: T
  // ) {
  //   const entries = await this.cvService.getTopLevelProperty(
  //     cvId,
  //     propertyName
  //   );
  //   if (!entries) {
  //     return undefined;
  //   }
  //   return entries;
  // }

  // private static readonly entryResolvers: EntryResolverConfig[] = [
  //   {
  //     fieldName: 'contactInfoEntries',
  //     returnType: () => [ContactInfo],
  //     propertyName: 'contactInfoEntries',
  //   },
  //   {
  //     fieldName: 'workExperienceEntries',
  //     returnType: () => [WorkExperience],
  //     propertyName: 'workExperienceEntries',
  //   },
  //   {
  //     fieldName: 'projectEntries',
  //     returnType: () => [Project],
  //     propertyName: 'projectEntries',
  //   },
  //   {
  //     fieldName: 'educationEntries',
  //     returnType: () => [Education],
  //     propertyName: 'educationEntries',
  //   },
  //   {
  //     fieldName: 'skillEntries',
  //     returnType: () => [Skill],
  //     propertyName: 'skillEntries',
  //   },
  // ];

  // private createEntryResolver(config: EntryResolverConfig) {
  //   const resolver = async (parent: CvObjectType) => {
  //     return this.getEntries(parent._id, config.propertyName);
  //   };
  //
  //   Object.defineProperty(this, config.fieldName, {
  //     value: resolver,
  //     writable: true,
  //     configurable: true,
  //   });
  //
  //   // Apply decorator metadata
  //   Reflect.defineMetadata(
  //     'graphql:resolver_type',
  //     config.returnType,
  //     this,
  //     config.fieldName
  //   );
  //   Reflect.defineMetadata(
  //     'graphql:resolver_options',
  //     { nullable: true },
  //     this,
  //     config.fieldName
  //   );
  // }

  // @ResolveField(() => AboutMe, { nullable: true })
  // async aboutMe(
  //   @Parent() { _id, aboutMe }: CvObjectType
  // ): Promise<AboutMe | undefined> {
  //   console.log(
  //     `resolve field aboutMe for cvId: ${_id}. so far about me: ${aboutMe}`
  //   );
  //   // todo
  //   return this.cvService.getTopLevelProperty(_id, 'aboutMe');
  // }

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
    return cv;
  }

  @Mutation(() => Boolean)
  async deleteCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<boolean> {
    return this.cvService.deleteCv({ cvId, userId });
  }

  @Mutation(() => GenerateNewEntryItemObjectType)
  async generateNewEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryFieldName', { type: () => CvEntryType })
    entryFieldName: CvEntryType
  ): Promise<GenerateNewEntryItemObjectType> {
    const entryItem = await this.cvService.generateNewEntryItem({
      entryFieldName,
      cvId,
      userId,
    });

    console.log(`new entryItem: ${JSON.stringify(entryItem, null, 2)}`);

    return {
      [entryFieldName]: entryItem,
    };
  }

  @Mutation(() => Boolean)
  async deleteEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryFieldName', { type: () => CvEntryType })
    entryFieldName: CvEntryType,
    @Args('entryItemId', { type: () => ID }) entryItemId: string
  ) {
    return this.cvService.deleteEntryItem({
      userId,
      entryItemId,
      cvId,
      entryFieldName,
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
    return cv;
  }

  @Mutation(() => Boolean)
  async deleteCvEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryItemId', { type: () => ID }) entryItemId: string,
    @Args('entryFieldName', { type: () => CvEntryType })
    entryFieldName: CvEntryType
  ): Promise<boolean> {
    await this.cvService.deleteEntryItem({
      cvId,
      userId,
      entryFieldName,
      entryItemId,
    });
    return true;
  }
}
