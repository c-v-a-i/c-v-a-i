import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Education {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  degree!: string | null;

  @Field(() => String, { nullable: true })
  duration?: string | null;

  @Field(() => String, { nullable: true })
  location?: string | null;

  @Field(() => String, { nullable: true })
  type?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => [String], { nullable: true })
  skills?: string[] | null;

  @Field(() => Int)
  positionIndex!: number;
}
