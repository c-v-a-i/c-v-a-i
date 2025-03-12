import type { CvEntryType } from './dto';

export type CvManagerMethodProps = {
  cvId: string;
  userId: string;
};

export type EntryItemSelectorProps = {
  entryItemId: string;
  entryFieldName: CvEntryType;
};
export type CvEntryItemManagerProps = CvManagerMethodProps &
  EntryItemSelectorProps;

export type CreateEntryItemProps = {
  entryFieldName: CvEntryType;
  positionIndex: number;
};
