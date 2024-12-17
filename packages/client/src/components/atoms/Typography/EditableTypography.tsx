// EditableTypography.tsx
import React, { useRef, useCallback, useEffect } from 'react';
import { useEditableTypographyBase } from '../../../hooks';
import { useTypographyActionsPortal } from '../../../hooks';
import { EditableTypographyBase } from './EditableTypographyBase';
import { grey } from '@mui/material/colors';
import type { EditableTypographyProps } from './types';

export const EditableTypography = ({
  id,
  value,
  onSave,
  onAiEdit,
  multiline,
  isEditing: defaultIsEditing,
  component,
  ...typographyProps
}: EditableTypographyProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const {
    isEditing,
    startEditing,
    tempValue,
    setTempValue,
    handleSave,
    handleCancel,
  } = useEditableTypographyBase({ value, onSave });

  useEffect(() => {
    if (defaultIsEditing) startEditing();
  }, [defaultIsEditing, startEditing]);

  const { triggerPortal, isPortalVisible } = useTypographyActionsPortal({
    onEdit: startEditing,
  });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      // Don't show popup if editing
      if (isEditing) return;
      e.preventDefault();
      const coords = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
      };
      triggerPortal(true, coords);
    },
    [isEditing, triggerPortal]
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      // if it's right mouse key, don't do anything.
      // if it's left mouse key click, hide
      if (event.button !== 0) {
        // Only proceed if it's the left mouse button (button 0)
        return;
      }
      triggerPortal(false);
    },
    [triggerPortal]
  );

  return (
    <EditableTypographyBase
      ref={textRef}
      onMouseDown={onMouseDown}
      onContextMenu={handleContextMenu}
      typographyProps={{
        ...typographyProps,
        sx: {
          border: `1px dashed ${isPortalVisible ? grey[300] : 'transparent'}`,
          borderRadius: '10px',
          width: 'fit-content',
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
