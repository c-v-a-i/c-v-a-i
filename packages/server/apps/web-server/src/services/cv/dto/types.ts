import type { UpdateCvInput } from './update-cv.input-type';
import type { AreTypesEqual, MapValues } from '@server/common/types';
import type { CvObjectType } from './cv.object-type';
import { CvEntryType } from './index';
import type { Cv, CvData } from '../../../../../../libs/schemas';

export const cvKeys = {
  itemizedEntries: [
    'educationEntries',
    'workExperienceEntries',
    'projectEntries',
    'skillEntries',
    'contactInfoEntries',
  ] as const satisfies (keyof UpdateCvInput)[],

  primitiveEntries: ['title'] as const satisfies (keyof UpdateCvInput)[],

  objectEntries: ['aboutMe'] as const satisfies (keyof UpdateCvInput)[],
};

export const isCvObjectTypeKeyForObjectEntries = (
  key: string
): key is (typeof cvKeys)['objectEntries'][number] =>
  cvKeys.objectEntries.includes(
    key as (typeof cvKeys)['objectEntries'][number]
  );

export const isCvObjectTypeKeyForItemizedEntries = (
  key: string
): key is (typeof cvKeys)['itemizedEntries'][number] =>
  cvKeys.itemizedEntries.includes(
    key as (typeof cvKeys)['itemizedEntries'][number]
  );

export const cvEntryTypeToCvEntryNameMap: Record<
  CvEntryType,
  (typeof cvKeys.itemizedEntries)[number]
> = {
  [CvEntryType.EDUCATION]: 'educationEntries',
  [CvEntryType.PROJECT]: 'projectEntries',
  [CvEntryType.WORK_EXPERIENCE]: 'workExperienceEntries',
  [CvEntryType.SKILL]: 'skillEntries',
  [CvEntryType.CONTACT_INFO]: 'contactInfoEntries',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _allKeysCovered: AreTypesEqual<
  keyof UpdateCvInput,
  (typeof cvKeys)[keyof typeof cvKeys][number]
> = true;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _cvCompatibleWithCvObjectType: AreTypesEqual<
  keyof Omit<Cv, keyof Document>,
  keyof Omit<CvObjectType, '_id'>
> = true;

export type ItemizedEntriesNames = typeof cvKeys.itemizedEntries;
export type ItemizedEntryItemMap<T extends ItemizedEntriesNames[number]> =
  CvData[T];
export type ItemizedEntryItem = MapValues<
  ItemizedEntryItemMap<ItemizedEntriesNames[number]>
>;
