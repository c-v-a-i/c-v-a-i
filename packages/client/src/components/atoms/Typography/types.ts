import type { TextFieldProps, TypographyProps } from '@mui/material';
import type { Maybe } from '../../../generated/graphql';

export type EditableTypographyProps = Omit<TypographyProps, 'ref'> & {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (newValue: string) => Promise<any>;
  onAiEdit?: (prompt: string) => void;
  multiline?: boolean;
  isEditing?: boolean;
  value?: Maybe<string>;
  textFieldProps?: TextFieldProps;
  valueRender?: (v?: Maybe<string>) => string;
};
