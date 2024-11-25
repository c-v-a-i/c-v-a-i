import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetSkillEntriesArgsType {
  @Field(() => ID)
  cvId!: string;
}
