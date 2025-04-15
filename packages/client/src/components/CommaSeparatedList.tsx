import type { ReactNode } from 'react';
import { useCallback } from 'react';
import React, { useMemo } from 'react';
import type { SxProps, Theme, TypographyProps } from '@mui/material';
import { Box } from '@mui/material';
import { usePreviewMode } from '../contexts';
import { EditableTypography } from './atoms';

export interface CommaSeparatedListProps {
  id: string;
  isEditing?: boolean;
  items?: string[];
  onSave: (items: string[]) => Promise<void>;
  labelPrefix?: ReactNode;
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  variant?: TypographyProps['variant'];
  showWhenEmpty?: boolean;
}

export const CommaSeparatedList = ({
  id,
  isEditing,
  items = [],
  onSave,
  labelPrefix,
  sx,
  textSx,
  variant = 'body2',
  showWhenEmpty = false,
}: CommaSeparatedListProps) => {
  const { isPreviewing } = usePreviewMode();

  const commaSeparatedValue = useMemo(() => items.join(', '), [items]);

  const shouldShow = useMemo(
    () => showWhenEmpty || !isPreviewing || items.length > 0,
    [showWhenEmpty, isPreviewing, items]
  );

  const handleSave = useCallback(
    (value: string) => {
      const newItems = value
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      return onSave(newItems);
    },
    [onSave]
  );

  if (!shouldShow) {
    return null;
  }

  return (
    <Box sx={sx} display="flex" alignItems="baseline">
      {labelPrefix && (
        <Box component="span" mr={0.5}>
          {labelPrefix}
        </Box>
      )}

      {/* Render the editable items */}
      <EditableTypography
        id={id}
        variant={variant}
        isEditing={isEditing}
        value={commaSeparatedValue}
        multiline
        onSave={handleSave}
        sx={textSx}
        textFieldProps={{
          sx: {
            width: '100%',
          },
        }}
      />
    </Box>
  );
};
