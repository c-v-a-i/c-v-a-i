import { useState, useCallback, useEffect } from 'react';

type UseEditableTypographyBaseProps = {
  value: string;
  onSave: (newValue: string) => Promise<void>;
};

type UseEditableTypographyBaseReturn = {
  isEditing: boolean;
  startEditing: () => void;
  tempValue: string;
  setTempValue: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  handleCancel: () => void;
};

export const useEditableTypographyBase = ({
  value,
  onSave,
}: UseEditableTypographyBaseProps): UseEditableTypographyBaseReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = useCallback(() => {
    if (tempValue === value) {
      setIsEditing(false);
      return;
    }
    onSave(tempValue)
      .catch(console.error)
      .finally(() => {
        setIsEditing(false);
      });
  }, [tempValue, value, onSave]);

  const handleCancel = useCallback(() => {
    setTempValue(value);
    setIsEditing(false);
  }, [value]);

  return {
    isEditing,
    startEditing,
    tempValue,
    setTempValue,
    handleSave,
    handleCancel,
  };
};
