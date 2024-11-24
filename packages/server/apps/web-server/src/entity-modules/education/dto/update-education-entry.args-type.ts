import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { Education } from '@server/entities';

@ArgsType()
export class UpdateEducationEntryArgsType extends PickType(
  PartialType(Education),
  ['name', 'degree', 'duration', 'location', 'type', 'description', 'skills'],
  ArgsType
) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
