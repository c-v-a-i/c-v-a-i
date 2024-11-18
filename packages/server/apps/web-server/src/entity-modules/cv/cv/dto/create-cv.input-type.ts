import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCvInput {
  @Field(() => String)
  title!: string;
}
