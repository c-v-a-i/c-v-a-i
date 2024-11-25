import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@ArgsType()
export class UpdateAboutMeEntryArgsType extends PickType(PartialType(AboutMe), ['description', 'fieldName'], ArgsType) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
