// EditableTypography.tsx
import React, { useRef, useCallback, useEffect } from 'react';
import type { TypographyProps } from '@mui/material';
import { useEditableTypographyBase } from '../../../hooks';
import { useTypographyActionsPortal } from '../../../hooks';
import { EditableTypographyBase } from '../../atoms/EditableTypographyBase';

type EditableTypographyProps = Omit<TypographyProps, 'ref'> & {
  id: string;
  value: string;
  onSave: (newValue: string) => Promise<void>;
  onAiEdit?: (prompt: string) => void;
  multiline?: boolean;
};

export const EditableTypography: React.FC<EditableTypographyProps> = (props) => {
  const { id, value, onSave, onAiEdit, multiline, variant } = props;

  const textRef = useRef<HTMLDivElement>(null);
  const { isEditing, startEditing, tempValue, setTempValue, handleSave, handleCancel } = useEditableTypographyBase({
    id,
    value,
    onSave,
    multiline,
    variant,
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

  const onMouseUp = useCallback(() => {
    if (!textRef.current) {
      return;
    }

    const selection = window.getSelection();
    if (!selection) {
      triggerPortal(false);
      return;
    }

    const selectedRange = selection.getRangeAt(0);
    const selectedRangeString = selectedRange.toString();
    const isSelected = selectedRangeString && textRef.current.textContent?.includes(selectedRangeString);

    if (isSelected) {
      const rect = selectedRange.getBoundingClientRect();
      const coords = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY - 50,
      };
      triggerPortal(true, coords);
    } else {
      triggerPortal(false);
    }
  }, [triggerPortal]);

  return (
    <div ref={textRef} onMouseUp={onMouseUp}>
      <EditableTypographyBase
        id={id}
        isEditing={isEditing}
        tempValue={tempValue}
        setTempValue={setTempValue}
        handleSave={handleSave}
        handleCancel={handleCancel}
        multiline={multiline}
        variant={variant}
        value={value}
      />
    </div>
  );
};
