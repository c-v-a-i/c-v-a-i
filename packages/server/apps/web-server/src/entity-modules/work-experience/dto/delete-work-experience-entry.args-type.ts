import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteWorkExperienceEntryArgsType {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
