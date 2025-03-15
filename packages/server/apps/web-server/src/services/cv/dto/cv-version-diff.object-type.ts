import { JsonDiffOperationType } from '../../../common/enums';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JsonPatchOperation {
  @Field(() => JsonDiffOperationType)
  op!: JsonDiffOperationType;

  @Field(() => String)
  path!: string;

  @Field(() => String, { nullable: true })
  value?: string;

  @Field(() => String, { nullable: true })
  from?: string;
}

@ObjectType()
export class VersionDiff {
  @Field(() => String)
  sourceVersionId!: string;

  @Field(() => String)
  targetVersionId!: string;

  @Field(() => [JsonPatchOperation])
  operations!: JsonPatchOperation[];
}
