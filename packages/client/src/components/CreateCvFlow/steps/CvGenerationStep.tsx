import { Box, Typography, keyframes, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCvCreationFlow } from '../../../contexts';

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

const textAppear = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(10px) scale(0.8);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
`;

export const CvGenerationStep = () => {
  const { createCv } = useCvCreationFlow();
  const [messageResult, setMessageResult] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const generateCv = async () => {
      try {
        const { changesSummarization } = await createCv();
        setMessageResult(changesSummarization);
        setStatus('success');
      } catch (error) {
        console.error('CV creation failed', error);
        setMessageResult('Failed to generate CV. Please try again.');
        setStatus('error');
      }
    };

    generateCv();
  }, [createCv]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      py={4}
      minHeight={200}
    >
      {status === 'loading' && (
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
            Crafting your perfect CV
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
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          transformOrigin: 'top center',
        }}
      >
        <Zoom in={status !== 'loading'} style={{ transitionDelay: '200ms' }}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {status === 'success' ? (
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: 48, mb: 1 }}
              />
            ) : (
              <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
            )}

            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                maxWidth: 500,
                px: 2,
                color: status === 'error' ? 'error.main' : 'text.primary',
                // Add slight scale animation to text specifically
                transform: 'scale(1)',
                animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              }}
            >
              {messageResult}
            </Typography>
          </Box>
        </Zoom>
      </Box>
    </Box>
  );
};
