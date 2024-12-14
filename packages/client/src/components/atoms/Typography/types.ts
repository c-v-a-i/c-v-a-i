import type { TypographyProps } from '@mui/material';

export type EditableTypographyProps = Omit<TypographyProps, 'ref'> & {
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (newValue: string) => Promise<any>;
  onAiEdit?: (prompt: string) => void;
  multiline?: boolean;
  isEditing?: boolean;
};
