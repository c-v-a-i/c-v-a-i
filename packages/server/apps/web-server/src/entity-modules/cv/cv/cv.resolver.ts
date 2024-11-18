import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CvService } from './cv.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guards/gql-auth/gql-auth.guard';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { CurrentUser } from '../../../common/decorators';
import { DecodedUserObjectType } from '../../../auth/dto';
import { DataloaderService } from '../../../core/dataloader/dataloader.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => CV)
export class CvResolver {
  constructor(
    private readonly cvService: CvService,
    private readonly dataloaderService: DataloaderService
  ) {}

  @Query(() => [CV])
  async getCVs(@CurrentUser() user: DecodedUserObjectType): Promise<CV[]> {
    return this.cvService.findAllByUser(user.client_id);
  }

  @Mutation(() => CV)
  async generateCVFromTemplate(
    @CurrentUser() user: DecodedUserObjectType,
    @Args('cvTemplateId') cvTemplateId: string
  ): Promise<CV> {
    return this.cvService.generateCvFromTemplate(user.client_id, cvTemplateId);
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
