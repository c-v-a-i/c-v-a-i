import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteCvArgsType {
  @Field(() => ID)
  id!: string;
}
