import React from 'react';
import { List } from '@mui/material';
import { MenuItem } from './MenuItem';
import type { ListItem } from './types';

type MenuListProps = {
  items: ListItem[];
  onAddItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
};

export const MenuList: React.FC<MenuListProps> = React.memo(({ items, onAddItem, onDeleteItem }) => {
  return (
    <List>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} onAdd={() => onAddItem(item.id)} onDelete={() => onDeleteItem(item.id)} />
      ))}
    </List>
  );
});
