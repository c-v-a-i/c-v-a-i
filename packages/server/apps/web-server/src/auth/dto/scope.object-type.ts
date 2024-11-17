import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScopeObjectType {
  @Field(() => String)
  public googleId!: string;
}
