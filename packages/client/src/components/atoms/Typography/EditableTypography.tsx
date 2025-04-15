import React, { useCallback, useEffect, useRef } from 'react';
import {
  useEditableTypographyBase,
  useTypographyActionsPortal,
} from '../../../hooks';
import { EditableTypographyBase } from './EditableTypographyBase';
import { grey } from '@mui/material/colors';
import type { EditableTypographyProps } from './types';

// TODO: this is a large piece of shit.
//  the implementation needs to be changed. There's too much ad-hoc things.
//  color doesn't work and it's buggy and forgive me god I've ever written this component...
export const EditableTypography = ({
  id,
  value,
  onSave,
  onAiEdit,
  multiline,
  isEditing: defaultIsEditing,
  component,
  textFieldProps,
  valueRender,
  sx,
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
      sx={{ alignContent: 'center', ...sx }}
      onMouseDown={onMouseDown}
      onContextMenu={handleContextMenu}
      typographyProps={{
        ...typographyProps,
        sx: {
          border: `1px inset dashed ${isPortalVisible ? grey[300] : 'transparent'}`,
          borderRadius: '10px',
          width: 'fit-content',
        },
      }}
      id={id}
      isEditing={isEditing}
      tempValue={tempValue}
      value={value}
      setTempValue={setTempValue}
      handleSave={handleSave}
      handleCancel={handleCancel}
      multiline={multiline}
      variant={typographyProps.variant}
      textFieldProps={textFieldProps}
      valueRender={valueRender}
    />
  );
};
