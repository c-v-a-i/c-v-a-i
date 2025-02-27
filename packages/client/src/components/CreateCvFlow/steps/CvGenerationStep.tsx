import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material';
import type { CvState, StepComponentProps } from '../types';
import { useEffect, useState } from 'react';

export type GenerationStepProps = StepComponentProps<Pick<CvState, 'progress'>>;

export const CvGenerationStepInner = ({ progress }: { progress: number }) => (
  <Box display="flex" flexDirection="column" alignItems="center" gap={3} py={4}>
    <CircularProgress
      size={60}
      thickness={4}
      variant={progress >= 100 ? 'determinate' : 'indeterminate'}
      value={progress}
    />

    <Box width="100%" maxWidth={400}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="body1" textAlign="center" mt={1}>
        {progress >= 100
          ? 'Generation Complete!'
          : `Processing... ${progress}%`}
      </Typography>
    </Box>
  </Box>
);

export const CvGenerationStep = ({
  open,
  updateData,
}: GenerationStepProps & { open?: boolean }) => {
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setProcessingProgress(0);
    }
  }, [open]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingProgress((p) => {
        const newProgress = Math.min(p + 10, 100);
        updateData({ progress: newProgress });

        if (newProgress === 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [updateData]);

  return <CvGenerationStepInner progress={processingProgress} />;
};
