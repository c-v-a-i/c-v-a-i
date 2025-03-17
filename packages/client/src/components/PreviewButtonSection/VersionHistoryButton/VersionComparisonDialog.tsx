import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useCompareVersionsLazyQuery } from '../../../generated/graphql';
import { match, P } from 'ts-pattern';
import { VersionComparisonContent } from '../../VersionComparisonContent';

interface VersionComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  cvId: string;
  versionId: string;
}

export const VersionComparisonDialog = ({
  open,
  onClose,
  cvId,
  versionId,
}: VersionComparisonDialogProps) => {
  const [compareVersions, { loading, error, data }] =
    useCompareVersionsLazyQuery({
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    if (open && cvId && versionId) {
      compareVersions({
        variables: {
          cvId,
          sourceVersionId: versionId,
        },
      });
    }
  }, [open, cvId, versionId, compareVersions]);

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
        {match([loading, data?.compareVersions, error])
          .with([true, P.nullish, P.nullish], () => (
            <div>loading true and data nullish</div>
          ))
          .with([false, P.nullish, P.nonNullable], ([, , error]) => (
            <Typography color={'error'}>{error.message}</Typography>
          ))
          .with([false, P.nonNullable, P.nullish], ([, data]) => (
            <VersionComparisonContent {...data} />
          ))
          .otherwise((ow) => (
            <div>otherwise option: {JSON.stringify(ow, null, 2)}</div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
