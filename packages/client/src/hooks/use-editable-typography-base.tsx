import { useState, useCallback, useEffect } from 'react';
import type { Maybe } from '../generated/graphql';

type UseEditableTypographyBaseProps = {
  value?: Maybe<string>;
  onSave: (newValue: string) => Promise<void>;
};

type UseEditableTypographyBaseReturn = {
  isEditing: boolean;
  startEditing: () => void;
  tempValue?: Maybe<string>;
  setTempValue: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  handleCancel: () => void;
};

type NonNullableSetStateAction<T> =
  T extends React.Dispatch<React.SetStateAction<infer S>>
    ? React.Dispatch<React.SetStateAction<NonNullable<S>>>
    : T;

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
    if (!tempValue || tempValue === value) {
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
    setTempValue: setTempValue as NonNullableSetStateAction<
      typeof setTempValue
    >,
    handleSave,
    handleCancel,
  };
};
