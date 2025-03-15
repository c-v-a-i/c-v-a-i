import { useEditableTypographyBase } from '../../../hooks';
import React, { useEffect } from 'react';
import { EditableTypographyBase } from './EditableTypographyBase';
import type { EditableTypographyProps } from './types';

export const EditableTypographyLight = ({
  id,
  value,
  onSave,
  onAiEdit,
  multiline,
  isEditing: defaultIsEditing,
  ...typographyProps
}: EditableTypographyProps) => {
  const {
    isEditing,
    startEditing,
    tempValue,
    setTempValue,
    handleSave,
    handleCancel,
  } = useEditableTypographyBase({
    value,
    onSave,
  });

  useEffect(() => {
    if (defaultIsEditing) {
      startEditing();
    }
  }, [startEditing, defaultIsEditing]);

  return (
    <EditableTypographyBase
      typographyProps={{
        ...typographyProps,
        sx: {
          borderRadius: '10px',
          width: 'fit-content',

          // background: alpha(pink[300], 0.1),

          ...(typographyProps.sx ?? {}),
        },
      }}
      id={id}
      isEditing={isEditing}
      tempValue={tempValue}
      setTempValue={setTempValue}
      handleSave={handleSave}
      handleCancel={handleCancel}
      multiline={multiline}
      value={value}
      variant={typographyProps.variant}
    />
  );
};
