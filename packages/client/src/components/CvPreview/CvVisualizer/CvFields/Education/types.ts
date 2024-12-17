import type { Education } from '../../../../../generated/graphql';
import type { UpdateItemizedFieldProps } from '../../types';

export type EducationInformationBlockProps = {
  ed: Education;
  isEditing?: boolean;
  updateField: (
    props: UpdateItemizedFieldProps<'educationEntries'>
  ) => Promise<void>;
};
