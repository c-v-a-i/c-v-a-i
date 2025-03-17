import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { CvService } from './cv.service';
import {
  CvEntryType,
  CvObjectType,
  GenerateNewEntryItemObjectType,
  PaginatedCvVersionHistoryObjectType,
  UpdateCvInput,
} from './dto';
import { VersioningActionsMetadataObjectType } from './dto/versioning-actions-metadata.object-type';

@UseGuards(GqlAuthGuard)
@Resolver(() => CvObjectType)
export class CvResolver {
  constructor(private readonly cvService: CvService) {}

  @Query(() => [CvObjectType])
  async getCvs(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType
  ): Promise<CvObjectType[]> {
    return this.cvService.getCvs({ userId });
  }

  @Query(() => CvObjectType)
  async getCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('versionId', { type: () => ID, nullable: true }) versionId?: string
  ): Promise<CvObjectType> {
    return this.cvService.getCv({ cvId, userId, versionId });
  }

  @Query(() => VersioningActionsMetadataObjectType)
  async getVersioningActionsMetadata(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ) {
    return this.cvService.getVersioningActionsMetadata({ cvId, userId });
  }

  @Query(() => PaginatedCvVersionHistoryObjectType)
  async getCvVersionHistory(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<PaginatedCvVersionHistoryObjectType> {
    return this.cvService.getCvVersionHistory({
      userId,
      cvId,
    });
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

  @Mutation(() => CvObjectType)
  async undoCvVersion(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<CvObjectType> {
    return this.cvService.undoCvVersion({ cvId, userId });
  }

  @Mutation(() => CvObjectType)
  async redoCvVersion(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string
  ): Promise<CvObjectType> {
    return this.cvService.redoCvVersion({ cvId, userId });
  }

  @Mutation(() => CvObjectType)
  async createCvFromVersion(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('versionId', { type: () => ID }) versionId: string
  ): Promise<CvObjectType> {
    return this.cvService.createCvFromVersion({
      userId,
      cvId,
      versionId,
    });
  }
}
