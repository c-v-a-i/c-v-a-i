import { ScopeObjectType } from './scope.object-type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DecodedUserObjectType {
  @Field(() => String)
  public client_id!: string;

  @Field(() => String)
  public given_name!: string;

  @Field(() => String)
  public family_name!: string;

  @Field(() => String)
  public email!: string;

  @Field(() => ScopeObjectType)
  public scope!: ScopeObjectType;
}
