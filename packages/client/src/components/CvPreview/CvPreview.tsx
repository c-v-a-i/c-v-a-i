import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useCurrentCv } from '../../contexts';
import { CvVisualizer } from './CvVisualizer';
import { CenteredBox } from '../atoms';
import { useCheckCvLazyQuery } from '../../generated/graphql';
import { PreviewModeButton } from '../PreviewButtonSection';
import { VersionControlButtons } from '../PreviewButtonSection/VersionControlButtons';

export const CurrentCvPreview: React.FC = () => {
  const { currentCvId } = useCurrentCv();

  const [fetchCvFunction, { loading, error, data }] = useCheckCvLazyQuery();

  useEffect(() => {
    if (!currentCvId) {
      return;
    }
    fetchCvFunction({
      variables: {
        cvId: currentCvId,
      },
    }).catch(() => {
      /* ignore */
    });
  }, [fetchCvFunction, currentCvId]);

  if (loading) {
    return <CenteredBox>Loading...</CenteredBox>;
  }
  if (error) {
    return (
      <CenteredBox>
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </CenteredBox>
    );
  }
  if (!data) {
    return <CenteredBox>No CV selected</CenteredBox>;
  }
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <CvVisualizer cvId={data.getCv._id} />

      <ActionButtonsContainer>
        <VersionControlButtons />
        <PreviewModeButton />
      </ActionButtonsContainer>
    </Box>
  );
};

const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed',
  right: '48px',
  top: '48px',
  zIndex: 1000,
}));
