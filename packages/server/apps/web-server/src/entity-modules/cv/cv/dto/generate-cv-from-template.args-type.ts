import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GenerateCvFromTemplateArgsType {
  @Field(() => ID)
  templateId!: string;
}
