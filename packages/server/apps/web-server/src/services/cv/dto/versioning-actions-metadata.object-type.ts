import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VersioningActionsMetadataObjectType {
  @Field(() => Boolean)
  canUndo!: boolean;

  @Field(() => Boolean)
  canRedo!: boolean;
}
