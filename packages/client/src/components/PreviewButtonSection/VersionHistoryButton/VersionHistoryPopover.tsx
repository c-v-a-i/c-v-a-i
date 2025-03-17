import React, { useCallback, useState } from 'react';
import { Popover, styled, Typography } from '@mui/material';
import type { CvVersionHistoryEntryObjectType } from '../../../generated/graphql';
import {
  useCreateCvFromVersionMutation,
  useGetCvVersionHistoryQuery,
} from '../../../generated/graphql';
import { toast } from 'react-toastify';
import { Box } from '../../atoms';
import { backgroundWithBackdrop } from '../../../theme';
import { BaseList, ListContainer } from '../../atoms/List';
import { VersionHistoryItem } from './VersionHistoryItem';
import { VersionComparisonDialog } from './VersionComparisonDialog';

interface VersionHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  cvId: string;
}

const VersionHistoryHeader = () => (
  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, px: 1 }}>
    Version History
  </Typography>
);

export const VersionHistoryPopover: React.FC<VersionHistoryPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  cvId,
}) => {
  // TODO: there should be a version comparison dialog showing the changes
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    null
  );
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  const { loading, error, data } = useGetCvVersionHistoryQuery({
    variables: { cvId },
  });

  const [createCvFromVersion] = useCreateCvFromVersionMutation({
    onCompleted: (data) => {
      toast.success(
        `New CV created from version: ${data.createCvFromVersion.title}`
      );
      onClose();
    },
    onError: (err) => toast.error(`Failed to create CV: ${err.message}`),
    refetchQueries: ['GetCvs'],
  });

  const handleCompareClick = useCallback((versionId: string) => {
    setSelectedVersionId(versionId);
    setCompareDialogOpen(true);
  }, []);

  const handleCreateFromClick = useCallback(
    (versionId: string) => {
      createCvFromVersion({
        variables: {
          cvId,
          versionId,
        },
      });
    },
    [createCvFromVersion, cvId]
  );

  const handleCloseCompareDialog = () => {
    setCompareDialogOpen(false);
    setSelectedVersionId(null);
  };

  const renderVersionItem = useCallback(
    (version: CvVersionHistoryEntryObjectType) => (
      <VersionHistoryItem
        version={version}
        onCompareClick={handleCompareClick}
        onCreateFromClick={handleCreateFromClick}
      />
    ),
    [handleCompareClick, handleCreateFromClick]
  );

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <VersionHistoryPopoverContainer>
          <ListContainer headerComponent={<VersionHistoryHeader />}>
            <BaseList
              items={data?.getCvVersionHistory?.items ?? []}
              renderItem={renderVersionItem}
              loading={loading}
              error={error}
              emptyMessage="No version history available"
            />
          </ListContainer>
        </VersionHistoryPopoverContainer>
      </Popover>

      {selectedVersionId && (
        <VersionComparisonDialog
          open={compareDialogOpen}
          onClose={handleCloseCompareDialog}
          versionId={selectedVersionId}
          cvId={cvId}
        />
      )}
    </>
  );
};

const VersionHistoryPopoverContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 320,
  padding: 8,
  ...backgroundWithBackdrop,
  backgroundColor: 'transparent',
}));
