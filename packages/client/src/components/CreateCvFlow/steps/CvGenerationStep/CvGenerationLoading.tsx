import { Box } from '../../../atoms';
import { Typography } from '@mui/material';
import { pulse } from './animations';

export const CvGenerationLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        animation: `${pulse} 1.5s ease-in-out infinite`,
      }}
    >
      <Typography variant="body1" color="text.secondary">
        Transforming your CV
      </Typography>
      <Box
        component="div"
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'action.selected',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="div"
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            opacity: 0.6,
          }}
        />
      </Box>
    </Box>
  );
};
