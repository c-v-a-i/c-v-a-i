import type { BoxProps } from '@mui/material';
import { Typography } from '@mui/material';
import { MessageBubble } from './MessageBubble';
import { Box } from '../atoms';

type MainResumeAssistantScreenProps = BoxProps & {
  reviewMessages?: string[];
  loading?: boolean;
  error?: Error | null;
};

export const MainResumeAssistantScreen = ({
  reviewMessages = [],
  loading = false,
  error = null,
  ...props
}: MainResumeAssistantScreenProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      {...props}
    >
      <Box
        sx={{
          height: '100%',
          flex: 1,
          padding: 2,
          overflowY: 'auto',
        }}
      >
        {loading && (
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Review is loading...
          </Typography>
        )}

        {error && (
          <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
            {error.message}
          </Typography>
        )}

        {!!reviewMessages?.length && (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {reviewMessages.map((msg, idx) => (
              <MessageBubble key={idx} content={msg} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
