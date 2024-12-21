import { usePreviewMode } from '../../../../contexts';
import React, { useMemo } from 'react';
import { EditableTypography } from '../../../atoms';
import type { TextSectionProps } from './types';

export const DescriptionTextSection = ({
  id,
  value,
  onSave,
  isEditing,
}: TextSectionProps) => {
  const { isPreviewing } = usePreviewMode();

  const shouldShowValue = useMemo(
    () => !isPreviewing || value,
    [isPreviewing, value]
  );

  if (!shouldShowValue) {
    return null;
  }
  return (
    <EditableTypography
      id={`description-${id}`}
      value={value}
      valueRender={(v) => v ?? 'Description (empty)'}
      onSave={onSave}
      multiline
      sx={{
        width: '100%',
      }}
      textFieldProps={{
        sx: { width: '100%' },
      }}
      isEditing={isEditing}
    />
  );
};
