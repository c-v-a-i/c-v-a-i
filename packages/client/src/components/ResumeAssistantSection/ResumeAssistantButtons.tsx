import { Box, Button } from '@mui/material';

type ResumeAssistantButtonsProps = {
  onReviewClick: () => void;
};

export const ResumeAssistantButtons = ({
  onReviewClick,
}: ResumeAssistantButtonsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'space-around',
        height: 'fit-content',
      }}
    >
      <Button onClick={onReviewClick}>Review this CV</Button>
    </Box>
  );
};
