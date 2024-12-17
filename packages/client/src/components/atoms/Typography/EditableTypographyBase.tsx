import React from 'react';
import { TextField, Box } from '@mui/material';
import type { TypographyProps, TextFieldProps, BoxProps } from '@mui/material';
import { TypographyWithMarkdown } from './TypographyWithMarkdown';
import { useMeasureTextWidth } from './utils';

type EditableTypographyBaseProps = Pick<
  BoxProps,
  'onMouseUp' | 'onMouseDown' | 'onContextMenu'
> & {
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
        onContextMenu,
      },
      ref
    ) => {
      const commonStyles = {
        typography: variant,
        width: '100%',
        padding: '0 2px',
      };
      const typographyWidth = useMeasureTextWidth({ text: value, variant });

      return (
        <Box
          id={id}
          sx={{ width: `min(${typographyWidth}, 100%)` }}
          onMouseUp={onMouseUp}
          onMouseDown={onMouseDown}
          onContextMenu={onContextMenu}
          ref={ref}
        >
          {isEditing ? (
            <TextField
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
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
              sx={{ ...commonStyles }}
              InputProps={{
                sx: { ...commonStyles, borderRadius: 0, margin: 0 },
              }}
              {...textFieldProps}
            />
          ) : (
            <TypographyWithMarkdown
              variant={variant}
              sx={{ ...commonStyles }}
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
