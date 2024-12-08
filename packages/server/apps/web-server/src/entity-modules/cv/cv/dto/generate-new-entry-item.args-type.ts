import { ArgsType, Field, ID } from '@nestjs/graphql';
import { CvEntryType } from '@server/common/enums';

@ArgsType()
export class GenerateNewEntryItemArgsType {
  @Field(() => ID)
  cvId!: string;

  @Field(() => CvEntryType)
  type!: CvEntryType;
}
