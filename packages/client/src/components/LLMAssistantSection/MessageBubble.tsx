import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import React from 'react';
import { TypographyWithMarkdown } from '../atoms';

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
      <TypographyWithMarkdown variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </TypographyWithMarkdown>
    </Box>
  );
};
