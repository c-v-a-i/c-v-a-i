import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetContactInfoEntriesByCvArgsType {
  @Field(() => ID)
  cvId!: string;
}
