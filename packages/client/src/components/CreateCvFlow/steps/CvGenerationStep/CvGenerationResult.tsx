import { Box, TypographyWithMarkdown } from '../../../atoms';
import { styled } from '@mui/material';
import { textAppear } from './animations';

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
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignContent={'flex-start'}
        >
          <GenerationResultMessage status={status}>
            {message}
          </GenerationResultMessage>
        </Box>
      </Box>
    </CvGenerationResultContainer>
  );
};

export const CvGenerationResultContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  transformOrigin: 'top center',
}));

export const GenerationResultMessage = styled(TypographyWithMarkdown)<{
  status: 'error' | 'success';
}>(({ theme, status }) => ({
  maxWidth: 500,
  px: 2,
  color:
    status === 'error' ? theme.palette.error.main : theme.palette.text.primary,
  transform: 'scale(1)',
  animation: `${textAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
}));
