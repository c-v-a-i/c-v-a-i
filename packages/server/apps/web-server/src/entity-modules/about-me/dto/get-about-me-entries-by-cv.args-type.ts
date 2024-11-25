import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetAboutMeEntriesByCvArgsType {
  @Field(() => ID)
  cvId!: string;
}
