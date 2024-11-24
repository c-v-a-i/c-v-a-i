import { ArgsType, Field, ID, PickType } from '@nestjs/graphql';
import { CV } from '@server/entities';

@ArgsType()
export class UpdateCvArgsType extends PickType(
  CV,
  ['aboutMe', 'workExperienceEntries', 'contactInfo', 'educationEntries', 'projectEntries', 'skillEntries', 'title'],
  ArgsType
) {
  @Field(() => ID, { nullable: false })
  id!: string;
}
