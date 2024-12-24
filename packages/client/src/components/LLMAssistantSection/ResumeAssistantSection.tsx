import { Box, Button, Typography } from '@mui/material';
import { MainResumeAssistantScreen } from './MainResumeAssistantScreen';
import { useCurrentCv } from '../../contexts';
import { useCvReview } from '../../hooks';

type ResumeAssistantSectionInnerProps = {
  cvId: string;
};

const ResumeAssistantSectionInner = ({
  cvId,
}: ResumeAssistantSectionInnerProps) => {
  const { reviewMessages, loading, error, fetchReview } = useCvReview({
    cvId,
  });

  const handleReviewClick = () => {
    fetchReview();
  };

  return (
    <Box
      sx={({ palette }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        height: '60%',
        borderTop: `1px solid`,
        borderRadius: '10px',
        borderColor: palette.primary.main,
      })}
    >
      <Box display={'flex'} padding={1}>
        <Typography flex={1} variant="h6" textAlign={'center'}>
          AI CV review
        </Typography>

        <Button
          sx={{
            gap: 2,
            height: 'fit-content',
            width: 'fit-content',
            borderRadius: '10px',
          }}
          onClick={handleReviewClick}
          size={'small'}
        >
          Run review!
        </Button>
      </Box>

      <MainResumeAssistantScreen
        reviewMessages={reviewMessages}
        loading={loading}
        error={error}
        flex={1}
      />
    </Box>
  );
};

export const ResumeAssistantSection = ({}) => {
  const { currentCvId } = useCurrentCv();

  if (!currentCvId) {
    return <Typography color={'error'}>No selected CV</Typography>;
  }
  return <ResumeAssistantSectionInner cvId={currentCvId} />;
};
