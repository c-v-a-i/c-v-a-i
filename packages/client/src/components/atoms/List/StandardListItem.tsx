import React from 'react';
import { ListItemText, ListItemButton } from '@mui/material';
import type { StandardListItemProps } from './types';

export function StandardListItem<T>({
  _id,
  // item,
  primary,
  secondary,
  actions,
  selected,
  onClick,
  highlight,
  sx,
}: StandardListItemProps<T>) {
  const handleClick = () => {
    if (onClick) onClick(_id);
  };

  return (
    <ListItemButton
      onClick={handleClick}
      selected={selected}
      sx={{
        backgroundColor: highlight ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 1,
        padding: 1,
        paddingX: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick
          ? {
              backgroundColor: 'rgba(25, 118, 210, 0.05)',
            }
          : undefined,
        ...sx,
      }}
    >
      <ListItemText primary={primary} secondary={secondary} />

      {actions}
    </ListItemButton>
  );
}
