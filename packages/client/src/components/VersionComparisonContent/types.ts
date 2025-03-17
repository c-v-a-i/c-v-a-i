import type { GetCvQuery } from '../../generated/graphql';

export type CvData = NonNullable<GetCvQuery['getCv']>;

export type ChangeAction = 'added' | 'removed' | 'changed';
export type ItemAction = 'added' | 'removed' | 'modified';

export type FieldChange = {
  label: string;
  oldValue: string | null;
  newValue: string | null;
  action: ChangeAction;
};

export type ItemChange = {
  name: string;
  fields: FieldChange[];
  action: ItemAction;
};

export type SectionChange = {
  section: string;
  items: ItemChange[];
};

export type VersionComparisonContentProps = {
  left: CvData;
  right: CvData;
};
