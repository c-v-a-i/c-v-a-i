import { registerEnumType } from '@nestjs/graphql';

export enum ReviewStatusType {
  READY_FOR_REVIEW = 'READY_FOR_REVIEW',
  NO_SUBSCRIPTION = 'NO_SUBSCRIPTION',
  NO_REVIEWS_REMAIN = 'NO_REVIEWS_REMAIN',
  ALREADY_REVIEWED = 'ALREADY_REVIEWED',
}
registerEnumType(ReviewStatusType, {
  name: 'ReviewStatusType',
});
