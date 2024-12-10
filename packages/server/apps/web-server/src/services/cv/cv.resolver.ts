import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth/gql-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { DecodedUserObjectType } from '../../auth/dto';
import { CvService } from './cv.service';
import { Cv } from './cv.schema';
import { CvEntryType } from './dto';
import { UpdateCvInput } from './dto/update-cv.input-type';
import { CvObjectType, convertCvToObjectType } from './dto';

@UseGuards(GqlAuthGuard)
@Resolver(() => Cv)
export class CvResolver {
  private readonly logger = new Logger(CvResolver.name);

  constructor(private readonly cvService: CvService) {}

  @Query(() => [CvObjectType])
  async getCvs(@CurrentUser() { client_id: userId }: DecodedUserObjectType): Promise<CvObjectType[]> {
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

  @Mutation(() => CvObjectType)
  async createNewCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('templateId', { type: () => ID }) templateId: string
  ): Promise<CvObjectType> {
    const cv = templateId
      ? await this.cvService.generateCvFromTemplate({ userId, cvId: templateId })
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
  @Mutation(() => CvObjectType)
  async generateNewEntryItem(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('entryType', { type: () => CvEntryType }) entryType: CvEntryType
  ): Promise<CvObjectType> {
    const cv = await this.cvService.generateNewEntryItem({ entryType, cvId, userId });
    return convertCvToObjectType(cv);
  }

  @Mutation(() => CvObjectType)
  async updateCv(
    @CurrentUser() { client_id: userId }: DecodedUserObjectType,
    @Args('cvId', { type: () => ID }) cvId: string,
    @Args('data', { type: () => UpdateCvInput }) data: UpdateCvInput
  ): Promise<CvObjectType> {
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
