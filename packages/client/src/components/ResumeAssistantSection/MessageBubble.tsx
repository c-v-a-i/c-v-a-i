import type { BoxProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React from 'react';

type MessageBubbleProps = BoxProps & {
  content: string;
};

export const MessageBubble = ({
  content,
  sx,
  ...props
}: MessageBubbleProps) => {
  return (
    <Box
      sx={({ palette }) => ({
        display: 'inline-block',
        padding: '8px 12px',
        borderRadius: '12px',
        maxWidth: '80%',
        background: palette.secondary.light,
        // ...sx,
      })}
      {...props}
    >
      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </Typography>
    </Box>
  );
};
