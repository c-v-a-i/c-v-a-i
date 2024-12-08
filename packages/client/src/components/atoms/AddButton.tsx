import React from 'react';
import type { ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';

export const AddButton = (props: ButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      {...props}
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        background: alpha(theme.palette.primary.main, 0.2),
        backgroundImage: `repeating-linear-gradient(
          135deg,
          rgba(0,0,0,0.2),
          ${alpha(theme.palette.primary.main, 0.4)} 2px,
          transparent 2px,
          transparent 12px
        )`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <AddIcon
        sx={{
          height: '100%',
          color: theme.palette.primary.main,
        }}
      />
    </Button>
  );
};
