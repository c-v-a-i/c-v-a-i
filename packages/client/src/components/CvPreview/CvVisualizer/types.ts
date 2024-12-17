import type {
  Education,
  WorkExperience,
  GetCvQuery,
  UpdateCvInput,
  Project,
  Skill,
  ContactInfo,
} from '../../../generated/graphql';

export type CvEntriesOfArrayType = Pick<
  UpdateCvInput,
  Extract<keyof UpdateCvInput, `${string}Entries`>
>;

export type CvEntryArrayFieldName = keyof CvEntriesOfArrayType;

export type CvEntryComponentProps = {
  cvId: string;
};

export type IterableCvEntry<T extends CvEntryArrayFieldName> = NonNullable<
  GetCvQuery['getCv'][T]
>;

export type ArrayElementType<T> = T extends Array<infer U> ? U : T;

export type CvEntryItem = ArrayElementType<
  IterableCvEntry<CvEntryArrayFieldName>
>;

type UpdateCvSubselectEntry<T extends keyof UpdateCvInput> = ArrayElementType<
  NonNullable<UpdateCvInput[T]>
>;

// TODO: refactor
export type UpdateFieldProps<T extends keyof UpdateCvInput> = {
  fieldName: Exclude<keyof UpdateCvSubselectEntry<T>, '_id'>;
  value: UpdateCvSubselectEntry<T>[Exclude<
    keyof UpdateCvSubselectEntry<T>,
    '_id'
  >];
};

export type UpdateItemizedFieldProps<T extends CvEntryArrayFieldName> =
  UpdateFieldProps<T> & {
    _id: string;
  };

export type ArrayElementEnhancer<T, S> =
  T extends Array<infer ArrayElement> ? Array<ArrayElement & S> : T;

type CvFieldNameToObjectType = {
  workExperienceEntries: WorkExperience;
  educationEntries: Education;
  projectEntries: Project;
  skillEntries: Skill;
  contactInfoEntries: ContactInfo;
};

export type CvEntryItemProps<T extends CvEntryArrayFieldName> = {
  entry: CvFieldNameToObjectType[T];
  isEditing?: boolean;
  cvId: string;
  removeEntry: () => Promise<void>;
  updateField: (props: UpdateItemizedFieldProps<T>) => Promise<void>;
};
