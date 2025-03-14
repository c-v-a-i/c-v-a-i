import { createPaginatedObjectType } from '@server/common/graphql';
import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { CvVersion } from '../../../../../../libs/schemas';

@ObjectType()
export class CvVersionHistoryEntry extends PickType(CvVersion, [
  '_id',
  'versionNumber',
  'createdAt',
]) {
  @Field(() => Boolean)
  isCurrentVersion!: boolean;
}

@ObjectType()
export class PaginatedCvVersionHistoryObjectType extends createPaginatedObjectType(
  CvVersionHistoryEntry
) {}
