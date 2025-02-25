import { Field, ObjectType } from '@nestjs/graphql';
import { CvObjectType } from '../../cv/dto';

@ObjectType()
export class ConvertPdfToCvObjectType {
  @Field(() => String)
  comment!: string;

  @Field(() => CvObjectType, { nullable: true })
  cv?: CvObjectType | null;
}
