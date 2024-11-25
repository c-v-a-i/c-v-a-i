import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { Skill } from '@server/entities';

@ArgsType()
export class UpdateSkillEntryArgsType extends PickType(
  PartialType(Skill),
  [
    'category', 'items'
  ],
  ArgsType
) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
