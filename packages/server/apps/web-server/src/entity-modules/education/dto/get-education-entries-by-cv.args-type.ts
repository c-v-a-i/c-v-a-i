import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetEducationEntriesByCvArgsType {
  @Field(() => ID)
  cvId!: string;
}
