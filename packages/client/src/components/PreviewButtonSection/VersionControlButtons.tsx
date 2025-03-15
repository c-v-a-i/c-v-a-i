import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {
  refetchGetVersioningActionsMetadataQuery,
  useGetVersioningActionsMetadataQuery,
  useRedoCvVersionMutation,
  useUndoCvVersionMutation,
} from '../../generated/graphql';
import { IconButton } from '../atoms';
import { toast } from 'react-toastify';
import { useCurrentCv } from '../../contexts';

const VersionControlButtonsInner = ({ cvId }: { cvId: string }) => {
  const {
    data: {
      getVersioningActionsMetadata: { canUndo = false, canRedo = false } = {},
    } = {},
  } = useGetVersioningActionsMetadataQuery({
    variables: { cvId },
  });

  const refetchUndoRedoQueries = useMemo(
    () => [refetchGetVersioningActionsMetadataQuery({ cvId })],
    [cvId]
  );

  const [undoVersion, { loading: undoLoading }] = useUndoCvVersionMutation({
    onError: (err) => toast.error(`Failed to undo: ${err.message}`),
    refetchQueries: refetchUndoRedoQueries,
  });

  const [redoVersion, { loading: redoLoading }] = useRedoCvVersionMutation({
    onError: (err) => toast.error(`Failed to redo: ${err.message}`),
    refetchQueries: refetchUndoRedoQueries,
  });

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        title="Undo to previous version"
        onClick={() => undoVersion({ variables: { cvId } })}
        disabled={!canUndo || undoLoading}
      >
        <UndoIcon />
      </IconButton>

      <IconButton
        title="Redo to next version"
        onClick={() => redoVersion({ variables: { cvId } })}
        disabled={!canRedo || redoLoading}
      >
        <RedoIcon />
      </IconButton>
    </Box>
  );
};

export const VersionControlButtons = () => {
  const { currentCvId } = useCurrentCv();

  if (!currentCvId) return null;
  return <VersionControlButtonsInner cvId={currentCvId} />;
};
