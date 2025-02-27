import { useCallback, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { ImportPdfDialog } from '../../ImportCvDialog';
import { CvCreationDialog } from '../../CreateCvFlow';

export const CvCreationActions = () => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  return (
    <>
      <RowContainer justifyContent="space-evenly" gap={4} padding={2}>
        <FullWidthButton
          variant="contained"
          onClick={() => setImportDialogOpen(true)}
        >
          Import PDF
        </FullWidthButton>

        <FullWidthButton variant="contained" onClick={() => openDialog()}>
          Create with LLM
        </FullWidthButton>
      </RowContainer>

      <ImportPdfDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />

      <CvCreationDialog open={isDialogOpen} onClose={closeDialog} />
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
