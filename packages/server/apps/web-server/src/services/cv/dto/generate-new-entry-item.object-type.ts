import { ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CvObjectType } from './cv.object-type';
import { cvKeys } from './types';

@ObjectType()
export class GenerateNewEntryItemObjectType extends PartialType(
  PickType(CvObjectType, cvKeys.itemizedEntries)
) {}
