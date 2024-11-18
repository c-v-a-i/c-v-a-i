import React from 'react';
import { ListItemText, IconButton, ListItemSecondaryAction, Box, ListItemButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { ListItem as ListItemType } from './types';
import { TypographyWithOverflow } from '../../atoms';

type MenuItemProps = {
  item: ListItemType;
  onDelete: () => void;
};

export const MenuItem: React.FC<MenuItemProps> = React.memo(({ item, onDelete }) => {
  return (
    <ListItemButton
      component={Box}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ListItemText secondary={''}>
        <TypographyWithOverflow sx={{ width: '90%' }}>{item.name}</TypographyWithOverflow>
      </ListItemText>
      <ListItemSecondaryAction>
        {/* TODO: modify so there are 3 dots and options: use as template ; delete */}
        <IconButton onClick={onDelete} edge="end" aria-label="delete" sx={{ marginLeft: 1 }}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
});
