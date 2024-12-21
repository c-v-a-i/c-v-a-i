import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../../atoms';
import type { EditableTypographyProps } from '../../atoms/Typography/types';
import { usePreviewMode } from '../../../contexts';

type SkillsForItemizedEntryEditorProps = Pick<
  EditableTypographyProps,
  'onSave' | 'id' | 'isEditing' | 'value'
>;

export const SkillsForItemizedEntryEditor: React.FC<
  SkillsForItemizedEntryEditorProps
> = ({ id, isEditing, value, onSave }) => {
  const { isPreviewing } = usePreviewMode();

  const shouldShowSkills = useMemo(
    () => !isPreviewing || value,
    [isPreviewing, value]
  );

  if (!shouldShowSkills) {
    return null;
  }
  return (
    <Box color={grey[600]}>
      <EditableTypography
        id={id}
        variant={'body2'}
        color={grey[600]}
        isEditing={isEditing}
        value={value}
        valueRender={(value) => `Skills: ${value ?? '(empty)'}`}
        multiline
        onSave={onSave}
        textFieldProps={{
          sx: {
            width: '100%',
          },
        }}
      />
    </Box>
  );
};
