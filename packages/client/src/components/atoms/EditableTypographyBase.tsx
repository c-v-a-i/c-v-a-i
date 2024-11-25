import React from 'react';
import { TextField, Box } from '@mui/material';
import type { TypographyProps, TextFieldProps, BoxProps } from '@mui/material';
import { TypographyWithMarkdown } from './TypographyWithMarkdown';

type EditableTypographyBaseProps = Pick<BoxProps, 'onMouseUp' | 'onMouseDown'> & {
  id: string;
  isEditing: boolean;
  tempValue: string;
  setTempValue: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  handleCancel: () => void;
  multiline?: boolean;
  variant?: TypographyProps['variant'];
  typographyProps?: TypographyProps;
  textFieldProps?: TextFieldProps;
  value: string;
};

export const EditableTypographyBase = React.memo(
  React.forwardRef<HTMLDivElement, EditableTypographyBaseProps>(
    (
      {
        id,
        isEditing,
        tempValue,
        setTempValue,
        handleSave,
        handleCancel,
        multiline = false,
        variant = 'body1',
        typographyProps,
        textFieldProps,
        value,
        onMouseUp,
        onMouseDown,
      },
      ref
    ) => {
      const commonStyles = {
        typography: variant,
        width: '100%',
        padding: '0 2px',
      };

      return (
        <Box id={id} sx={{ width: 'fit-content' }} onMouseUp={onMouseUp} onMouseDown={onMouseDown} ref={ref}>
          {isEditing ? (
            <TextField
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleCancel}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
              autoFocus
              fullWidth
              multiline={multiline}
              variant="standard"
              size="small"
              sx={{
                ...commonStyles,
              }}
              InputProps={{
                sx: {
                  ...commonStyles,
                  borderRadius: 0,
                  margin: 0,
                },
              }}
              {...textFieldProps}
            />
          ) : (
            <TypographyWithMarkdown
              variant={variant}
              sx={{
                ...commonStyles,
              }}
              {...typographyProps}
            >
              {value}
            </TypographyWithMarkdown>
          )}
        </Box>
      );
    }
  )
);
