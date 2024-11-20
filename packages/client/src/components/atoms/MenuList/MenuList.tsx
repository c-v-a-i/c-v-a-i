import React, { useCallback } from 'react';
import { List } from '@mui/material';
import { MenuItem } from './MenuItem';
import type { ListItem } from './types';
import { useCurrentCv } from '../../../contexts/use-current-cv';

type MenuListProps = {
  items: ListItem[];
  onDeleteItem: (itemId: string) => void;
};

export const MenuList: React.FC<MenuListProps> = React.memo(({ items, onDeleteItem }) => {
  const { setCurrentCvId } = useCurrentCv();

  const handleSelectCv = useCallback(
    (id: string) => {
      setCurrentCvId(id);
    },
    [setCurrentCvId]
  );
  const onDelete = (id: string) => onDeleteItem(id);
  const onCreateFromThis = () => alert('new hui created');

  return (
    <List>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onSelect={handleSelectCv}
          menuOptions={[
            { label: 'Create New from This', action: onCreateFromThis },
            { label: 'Delete', action: onDelete },
          ]}
        />
      ))}
    </List>
  );
});
