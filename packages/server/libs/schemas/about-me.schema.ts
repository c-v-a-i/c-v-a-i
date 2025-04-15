import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AboutMe {
  @Field(() => String)
  fieldName!: string;

  @Field(() => String)
  description!: string;
}
