import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AboutMe {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  fieldName!: string;

  @Field(() => String)
  description!: string;
}
