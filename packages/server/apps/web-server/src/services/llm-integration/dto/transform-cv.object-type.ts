import { Field, ObjectType } from '@nestjs/graphql';
import { CvObjectType } from '../../cv/dto';

@ObjectType()
export class TransformCvObjectType {
  @Field(() => String)
  comment!: string;

  @Field(() => CvObjectType)
  cv!: CvObjectType;
}
