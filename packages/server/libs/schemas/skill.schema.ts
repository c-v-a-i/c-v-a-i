import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  category!: string;

  @Field(() => [String])
  skills!: string[];

  @Field(() => Int)
  positionIndex!: number;
}
