import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteSkillEntryArgsType {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
