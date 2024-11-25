import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetProjectEntriesArgsType {
  @Field(() => ID)
  cvId!: string;
}
