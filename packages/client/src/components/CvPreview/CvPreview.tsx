import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useCurrentCv } from '../../contexts/use-current-cv';
import { CvVisualizer } from './CvVisualizer';
import { CenteredBox } from '../atoms';
import { useCheckCvLazyQuery } from '../../generated/graphql';

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
    </Box>
  );
};
