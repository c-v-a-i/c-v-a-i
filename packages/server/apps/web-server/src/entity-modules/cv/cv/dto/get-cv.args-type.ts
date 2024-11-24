import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetCvArgsType {
  @Field(() => ID)
  id!: string;
}
