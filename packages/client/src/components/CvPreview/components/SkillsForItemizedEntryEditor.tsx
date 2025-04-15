import type { ReactNode } from 'react';
import React from 'react';
import { grey } from '@mui/material/colors';
import { Typography } from '@mui/material';
import type { EditableTypographyProps } from '../../atoms/Typography/types';
import { CommaSeparatedList } from '../../CommaSeparatedList';

type SkillsForItemizedEntryEditorProps = Pick<
  EditableTypographyProps,
  'onSave' | 'id' | 'isEditing' | 'value'
> & {
  labelPrefix?: ReactNode;
};

export const SkillsForItemizedEntryEditor: React.FC<
  SkillsForItemizedEntryEditorProps
> = ({ id, isEditing, value, onSave, labelPrefix }) => {
  const items = value ? value.split(',').map((s) => s.trim()) : [];

  const handleSave = async (newItems: string[]) => {
    await onSave(newItems.join(', '));
  };

  const defaultLabelPrefix = (
    <Typography
      variant="body2"
      component="span"
      sx={{
        color: grey[600],
        fontWeight: 'bold',
      }}
    >
      Skills:
    </Typography>
  );

  const finalLabelPrefix =
    labelPrefix === undefined ? defaultLabelPrefix : labelPrefix;

  return (
    <CommaSeparatedList
      id={id}
      isEditing={isEditing}
      items={items}
      onSave={handleSave}
      labelPrefix={finalLabelPrefix}
      sx={{ color: grey[600] }}
      textSx={{ color: grey[600] }}
      variant="body2"
    />
  );
};
