export type CvEntryComponentProps = {
  cvId: string;
};

export type UpdateFieldProps<FIELD_ENTRY_VARIABLES extends object> = {
  fieldName: keyof FIELD_ENTRY_VARIABLES;
  value: string;
};

export type UpdateItemizedFieldProps<T extends object> = UpdateFieldProps<T> & {
  _id: string;
};

export type ArrayElementEnhancer<T, S> =
  T extends Array<infer ArrayElement> ? Array<ArrayElement & S> : T;
