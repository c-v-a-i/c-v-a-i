import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { ContactInfo } from '@server/entities';

@ArgsType()
export class UpdateContactInfoEntryArgsType extends PickType(
  PartialType(ContactInfo),
  ['email', 'phone', 'name'],
  ArgsType
) {
  @Field(() => ID)
  cvId!: string;

  @Field(() => ID)
  id!: string;
}
