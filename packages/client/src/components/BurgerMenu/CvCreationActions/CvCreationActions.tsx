import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { ImportPdfDialog } from '../../ImportPdfDialog';

export const CvCreationActions = () => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  return (
    <>
      <RowContainer justifyContent={'space-evenly'} gap={4} padding={2}>
        <FullWidthButton
          variant={'contained'}
          onClick={() => setImportDialogOpen(true)}
        >
          Import PDF
        </FullWidthButton>

        <FullWidthButton variant={'contained'} disabled>
          Create with LLM
        </FullWidthButton>
      </RowContainer>

      <ImportPdfDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />
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
