import React from 'react';
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import { AddButton } from '../../../../atoms';
import { usePreviewMode } from '../../../../../contexts';

type NewEntryManager = {
  onAddEntry: () => Promise<void>;
} & BoxProps;

export const AddEntryButton = ({ onAddEntry, ...props }: NewEntryManager) => {
  const { isPreviewing } = usePreviewMode();

  if (isPreviewing) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} {...props}>
      <AddButton fullWidth onClick={onAddEntry} size={'small'}>
        Add another entry
      </AddButton>
    </Box>
  );
};
