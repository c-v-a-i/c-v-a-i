import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { Project } from '@server/entities';

@ArgsType()
export class UpdateProjectEntryArgsType extends PickType(
  PartialType(Project),
  [
    'name', 'description', 'skills'
  ],
  ArgsType
) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
