import type { IconButtonProps } from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from './IconButton';

export const RemoveEntryButton = ({ onClick }: IconButtonProps) => {
  return (
    <IconButton
      title={'Remove entry'}
      onClick={onClick}
      sx={(theme) => ({
        color: theme.palette.error.light,
        height: '100%',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        flexDirection: 'column',
      })}
    >
      <RemoveIcon />
    </IconButton>
  );
};
