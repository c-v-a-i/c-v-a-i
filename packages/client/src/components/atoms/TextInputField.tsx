import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { usePreviewMode } from '../../contexts';

interface GenericInputFieldProps {
  onEnterKey: (inputValue: string) => void;
  placeholder?: string;
  width?: string | number;
}

export const TextInputField: React.FC<GenericInputFieldProps> = ({
  onEnterKey,
  placeholder = 'Enter text',
  width = '160px',
}) => {
  const [value, setValue] = useState('');

  const { isPreviewing } = usePreviewMode();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value.trim()) {
      onEnterKey(value.trim());
      setValue('');
    }
  };

  if (isPreviewing) {
    return null;
  }
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyPress}
      fullWidth
      variant="standard"
      size="small"
      sx={{ typography: 'body2', width }}
      placeholder={placeholder}
    />
  );
};
