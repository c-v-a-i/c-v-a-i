import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useCurrentCv } from '../../contexts/use-current-cv';

export const CurrentCvPreview: React.FC = () => {
  const { currentCvId } = useCurrentCv();
  const [currentCv, setCurrentCv] = useState<string | null>(null);

  useEffect(() => {
    if (currentCvId) {
      // Simulate fetching logic (e.g., GraphQL query with ID)
      setCurrentCv(`Fetched CV Details for ID: ${currentCvId}`);
    } else {
      setCurrentCv(null);
    }
  }, [currentCvId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {currentCvId ? (
        <Typography variant="h6">{currentCv}</Typography>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No CV is selected
        </Typography>
      )}
    </Box>
  );
};
