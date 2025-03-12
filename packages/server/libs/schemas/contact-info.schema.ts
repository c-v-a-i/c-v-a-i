import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactInfo {
  @Field(() => ID)
  _id!: string;

  @Field(() => String)
  linkName!: string;

  @Field(() => Number)
  positionIndex!: number;

  @Field(() => String)
  link!: string;
}
