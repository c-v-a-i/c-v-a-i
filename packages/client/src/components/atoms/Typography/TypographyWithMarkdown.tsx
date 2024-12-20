import React from 'react';
import type { TypographyProps } from '@mui/material';
import { Typography, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type TypographyWithMarkdownProps = Omit<TypographyProps, 'ref'> & {
  children: Parameters<typeof ReactMarkdown>[0]['children'];
};

export const TypographyWithMarkdown: React.FC<TypographyWithMarkdownProps> = ({
  children,
  variant = 'body1',
  sx,
  onClick,
}) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ node, ref, ...props }) => (
          <Typography variant={variant} sx={sx} onClick={onClick} {...props} />
        ),
        strong: ({ node, ref, ...props }) => (
          <Typography
            component="span"
            variant={variant}
            sx={{ fontWeight: 'bold', ...sx }}
            {...props}
          />
        ),
        em: ({ node, ref, ...props }) => (
          <Typography
            component="span"
            variant={variant}
            sx={{ fontStyle: 'italic', ...sx }}
            {...props}
          />
        ),
        a: ({ node, ref, ...props }) => <Link {...props} sx={sx} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
