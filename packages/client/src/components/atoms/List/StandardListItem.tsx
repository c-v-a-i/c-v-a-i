import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
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
}: StandardListItemProps<T>): JSX.Element {
  const handleClick = () => {
    if (onClick) onClick(_id);
  };

  return (
    <ListItem
      // @ts-expect-error
      button={!!onClick}
      onClick={handleClick}
      selected={selected}
      sx={{
        backgroundColor: highlight ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
        borderRadius: 1,
        padding: 1,
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

      {actions && <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>}
    </ListItem>
  );
}
