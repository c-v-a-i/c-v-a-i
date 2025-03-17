import { createPaginatedObjectType } from '@server/common/graphql';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { CvObjectType } from './cv.object-type';

@ObjectType()
export class CvVersionDataObjectType extends PickType(CvObjectType, [
  'title',
  'aboutMe',
  'educationEntries',
  'workExperienceEntries',
  'projectEntries',
  'skillEntries',
  'contactInfoEntries',
]) {}

@ObjectType()
export class CvVersionHistoryEntryObjectType {
  @Field(() => String)
  _id!: string;

  // @Field(() => CvVersionDataObjectType)
  // data!: CvVersionDataObjectType;
  //
  @Field(() => Boolean)
  isCurrentVersion!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Number)
  versionNumber!: number;
}

@ObjectType()
export class PaginatedCvVersionHistoryObjectType extends createPaginatedObjectType(
  CvVersionHistoryEntryObjectType
) {}
