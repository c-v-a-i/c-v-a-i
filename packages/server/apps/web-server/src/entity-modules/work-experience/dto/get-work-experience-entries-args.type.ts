import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetWorkExperienceEntriesArgsType {
  @Field(() => ID)
  cvId!: string;
}
