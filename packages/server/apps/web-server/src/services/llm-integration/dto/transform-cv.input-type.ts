import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TransformCvInputType {
  @Field(() => String)
  message!: string;

  @Field(() => String)
  templateId!: string;
}
