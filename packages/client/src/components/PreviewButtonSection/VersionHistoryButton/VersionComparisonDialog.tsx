import React, { useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useGetCvQuery } from '../../../generated/graphql';
import { Column } from '../../atoms';
import { VersionComparisonContent } from '../../VersionComparisonContent';

interface VersionComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  versionId: string;
  cvId: string;
}

export const VersionComparisonDialog = ({
  open,
  onClose,
  versionId,
  cvId,
}: VersionComparisonDialogProps) => {
  const {
    data: { getCv: leftCvData } = {},
    loading: leftCvLoading,
    error: leftCvError,
  } = useGetCvQuery({
    variables: {
      cvId,
    },
    fetchPolicy: 'no-cache',
  });

  const {
    data: { getCv: rightCvData } = {},
    loading: rightCvLoading,
    error: rightCvError,
  } = useGetCvQuery({
    variables: {
      cvId,
      versionId,
    },
    fetchPolicy: 'no-cache',
  });

  const isError = useMemo(
    () => !!leftCvError || !!rightCvError,
    [leftCvError, rightCvError]
  );
  const isLoading = useMemo(
    () => leftCvLoading || rightCvLoading,
    [leftCvLoading, rightCvLoading]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="version-comparison-dialog-title"
    >
      <DialogTitle id="version-comparison-dialog-title">
        Version Comparison
      </DialogTitle>

      <DialogContent>
        {isError && (
          <Column>
            <Typography color={'error'}>{leftCvError?.message}</Typography>
            <Typography color={'error'}>{rightCvError?.message}</Typography>
          </Column>
        )}

        {isLoading && !isError && <Typography>Loading...</Typography>}

        {!!leftCvData && !!rightCvData && (
          <VersionComparisonContent left={leftCvData} right={rightCvData} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
