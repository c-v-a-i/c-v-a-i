import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewCvOutput {
  @Field(() => [String])
  messages!: string[];
  //
  // @Field(() => CvObjectType)
  // newCvState!: CvObjectType;
}
