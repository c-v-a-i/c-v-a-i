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
import { toast } from 'react-toastify';
import { useCurrentCv, usePreviewMode } from '../../contexts';
import { IconButton } from '../atoms';
import { VersionHistoryButton } from './VersionHistoryButton';

const VersionControlButtonsInner = ({ cvId }: { cvId: string }) => {
  const {
    data: {
      getVersioningActionsMetadata: { canUndo = false, canRedo = false } = {},
    } = {},
  } = useGetVersioningActionsMetadataQuery({
    variables: { cvId },
  });

  const { isPreviewing } = usePreviewMode();

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

  if (isPreviewing) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        title="Undo"
        onClick={() => undoVersion({ variables: { cvId } })}
        disabled={!canUndo || undoLoading}
      >
        <UndoIcon />
      </IconButton>

      <IconButton
        title="Redo"
        onClick={() => redoVersion({ variables: { cvId } })}
        disabled={!canRedo || redoLoading}
      >
        <RedoIcon />
      </IconButton>

      <VersionHistoryButton />
    </Box>
  );
};

export const VersionControlButtons = () => {
  const { currentCvId } = useCurrentCv();

  if (!currentCvId) return null;
  return <VersionControlButtonsInner cvId={currentCvId} />;
};
