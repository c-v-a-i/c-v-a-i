import { keyframes, styled, Typography } from '@mui/material';
import { useCvCreationFlow } from '../../../contexts';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect } from 'react';
import { match } from 'ts-pattern';
import { Box } from '../../atoms';

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

// type CvGenerationResult =
//   | {
//       status: 'success';
//       newCvId: string;
//       message: string;
//     }
//   | {
//       status: 'error';
//       message: string;
//     }
//   | {
//       status: 'loading' | undefined;
//     };

const CvGenerationLoading = () => {
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

export const CvGenerationResult = ({
  status,
  message,
}: {
  status: 'error' | 'success';
  message: string;
}) => {
  return (
    <CvGenerationResultContainer>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {status === 'success' ? (
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 48, mb: 1 }}
          />
        ) : (
          <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
        )}

        <GenerationResultMessage status={status}>
          {message}
        </GenerationResultMessage>
      </Box>
    </CvGenerationResultContainer>
  );
};

const CvGenerationResultContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  transformOrigin: 'top center',
}));

const GenerationResultMessage = styled(Typography)<{
  status: 'error' | 'success';
}>(({ theme, status }) => ({
  textAlign: 'center',
  maxWidth: 500,
  px: 2,
  color:
    status === 'error' ? theme.palette.error.main : theme.palette.text.primary,
  transform: 'scale(1)',
  animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
}));

export const CvGenerationStep = () => {
  const { createCv, cvGenerationResult, templateId } = useCvCreationFlow();

  useEffect(() => {
    if (templateId) {
      console.log(`createCv called with template id: ${templateId}`);
      createCv();
    }
  }, [createCv, templateId]);

  useEffect(() => {
    console.log(`cv generation resul:`, cvGenerationResult);
  }, [cvGenerationResult]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      py={4}
      minHeight={200}
    >
      {match(cvGenerationResult)
        .with({ status: 'loading' }, () => <CvGenerationLoading />)
        .with({ status: 'success' }, (data) => <CvGenerationResult {...data} />)
        .with({ status: 'error' }, (data) => <CvGenerationResult {...data} />)
        .otherwise(() => (
          <div>Generation hasn't been started yet</div>
        ))}
    </Box>
  );
};
