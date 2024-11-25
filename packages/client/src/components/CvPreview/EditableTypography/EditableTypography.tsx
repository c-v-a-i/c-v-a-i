import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { TypographyProps } from '@mui/material';
import { useEditableTypographyBase } from '../../../hooks';
import { useTypographyActionsPortal } from '../../../hooks';
import { EditableTypographyBase } from '../../atoms/EditableTypographyBase';
import { grey } from '@mui/material/colors';

type EditableTypographyProps = Omit<TypographyProps, 'ref'> & {
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (newValue: string) => Promise<any>;
  onAiEdit?: (prompt: string) => void;
  multiline?: boolean;
  isEditing?: boolean;
};

export const EditableTypography = ({
  id,
  value,
  onSave,
  onAiEdit,
  multiline,
  ...typographyProps
}: EditableTypographyProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { isEditing, startEditing, tempValue, setTempValue, handleSave, handleCancel } = useEditableTypographyBase({
    value,
    onSave,
  });

  const { triggerPortal } = useTypographyActionsPortal({
    onEdit: startEditing,
    onAiEdit,
  });

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    triggerPortal(false);
  }, [triggerPortal, isEditing]);

  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const getIsAnyTextSelected = useCallback(() => {
    return window.getSelection()?.getRangeAt(0).toString()?.length;
  }, []);

  const onMouseDown = useCallback(() => {
    const isAnyTextSelected = getIsAnyTextSelected();
    if (isAnyTextSelected) {
      triggerPortal(false);
      setIsPortalVisible(false);
    }
  }, [triggerPortal, getIsAnyTextSelected]);

  const onMouseUp = useCallback(() => {
    if (!textRef.current) {
      return;
    }

    setIsPortalVisible((prevVisible) => {
      const noTextSelected = !getIsAnyTextSelected();

      if (!prevVisible && !isEditing && noTextSelected) {
        const rect = textRef.current!.getBoundingClientRect();
        const coords = {
          x: rect.left + window.scrollX - 40,
          y: rect.top + window.scrollY - 5,
        };
        triggerPortal(true, coords);
        return true;
      } else {
        triggerPortal(false);
        return false;
      }
    });
  }, [getIsAnyTextSelected, isEditing, triggerPortal]);

  return (
    <EditableTypographyBase
      ref={textRef}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      typographyProps={{
        ...typographyProps,
        sx: {
          border: `1px dashed ${isPortalVisible ? grey[300] : 'transparent'}`,
          borderRadius: '10px',
          width: 'fit-content',

          // for debug
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
