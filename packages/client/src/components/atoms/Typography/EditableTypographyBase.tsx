import React from 'react';
import { TextField, Box } from '@mui/material';
import type { TypographyProps, TextFieldProps, BoxProps } from '@mui/material';
import { TypographyWithMarkdown } from './TypographyWithMarkdown';
import { useMeasureTextWidth } from './utils';
import type { Maybe } from '../../../generated/graphql';

type EditableTypographyBaseProps = Pick<
  BoxProps,
  'onMouseUp' | 'onMouseDown' | 'onContextMenu' | 'sx'
> & {
  id: string;
  isEditing: boolean;
  setTempValue: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
  handleCancel: () => void;
  multiline?: boolean;
  variant?: TypographyProps['variant'];
  typographyProps?: TypographyProps;
  textFieldProps?: TextFieldProps;
  tempValue?: Maybe<string>;
  value?: Maybe<string>;
  valueRender?: (v?: Maybe<string>) => string;
};

// FIXME: this component is fucked up. Simplify...
export const EditableTypographyBase = React.forwardRef<
  HTMLDivElement,
  EditableTypographyBaseProps
>(
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
      valueRender,
      sx,
    },
    ref
  ) => {
    const commonStyles = {
      typography: variant,
      width: '100%',
    };
    const typographyWidth = useMeasureTextWidth({
      text: value ?? valueRender?.(undefined) ?? Array(16).fill('A').toString(),
      variant,
    });

    return (
      <Box
        id={id}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onContextMenu={onContextMenu}
        ref={ref}
        sx={{
          width: '100%',
          ...sx,
        }}
      >
        {isEditing ? (
          <TextField
            autoFocus
            {...textFieldProps}
            value={tempValue ?? ''}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSave();
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            fullWidth
            multiline={multiline}
            variant="standard"
            size="small"
            sx={{
              ...commonStyles,
              width: `min(${typographyWidth}px + 10px, 100%)`,
              ...(textFieldProps?.sx ?? {}),
            }}
            InputProps={{
              sx: {
                ...commonStyles,
                borderRadius: 0,
                margin: 0,
                ...(textFieldProps?.InputProps?.sx ?? {}),
              },
            }}
          />
        ) : (
          <TypographyWithMarkdown
            {...typographyProps}
            variant={variant}
            sx={{
              ...(typographyProps?.sx ?? {}),
              ...commonStyles,
              ...(!value
                ? {
                    color: 'black',
                    opacity: '0.3',
                  }
                : {}),
            }}
          >
            {valueRender?.(value) ?? value}
          </TypographyWithMarkdown>
        )}
      </Box>
    );
  }
);
