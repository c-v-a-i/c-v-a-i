import { Box, Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { ImportPdfDialog } from '../../ImportPdfDialog';

export const CvCreationActions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <RowContainer justifyContent="space-evenly" gap={4} padding={2}>
        <FullWidthButton variant="contained" onClick={handleOpenDialog}>
          Import PDF
        </FullWidthButton>
        <FullWidthButton variant="contained" disabled>
          Create with LLM
        </FullWidthButton>
      </RowContainer>
      <ImportPdfDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

const RowContainer = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const FullWidthButton = styled(Button)`
  flex: 1;
`;
