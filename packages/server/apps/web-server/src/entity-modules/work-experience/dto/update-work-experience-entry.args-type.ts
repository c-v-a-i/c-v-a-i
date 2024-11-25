import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { WorkExperience } from '@server/entities';

@ArgsType()
export class UpdateWorkExperienceEntryArgsType extends PickType(
  PartialType(WorkExperience),
  [
    'name', 'position', 'duration', 'location', 'type', 'description', 'skills'
  ],
  ArgsType
) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
