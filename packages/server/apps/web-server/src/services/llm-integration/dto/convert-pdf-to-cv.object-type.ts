import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConvertPdfToCvObjectType {
  // TODO: update
  @Field(() => String)
  cv!: string;
}
