import type { IconButtonProps } from '@mui/material';
import { IconButton, Tooltip, Box } from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

export const RemoveEntryButton = ({ onClick }: IconButtonProps) => (
  <Box
    display={'flex'}
    // alignItems={'center'}
    // justifyContent={'start'}
    flexDirection={'column'}
    width={'36px'}
    // sx={{ background: 'pink' }}
  >
    <Tooltip title="Remove entry">
      <IconButton
        onClick={onClick}
        // display={'flex'}
        // alignItems={'center'}
        // justifyContent={'start'}
        // flexDirection={'column'}
        sx={(theme) => ({
          color: theme.palette.error.light,
          width: '100%',
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
    </Tooltip>
  </Box>
);
