import React from 'react';
import { Box } from '@mui/material';
import { AddButton } from '../../../../atoms';

type NewWorkExperienceManagerProps = {
  onAddEntry: () => Promise<void>;
};

export const NewEntryManager = ({ onAddEntry }: NewWorkExperienceManagerProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <AddButton fullWidth onClick={onAddEntry}>
        Add another entry
      </AddButton>
    </Box>
  );
};
