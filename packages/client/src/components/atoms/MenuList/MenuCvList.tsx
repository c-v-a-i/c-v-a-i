import React, { useCallback, useState } from 'react';
import { List } from '@mui/material';
import { MenuItem } from './MenuItem';
import type { ListItem } from './types';
import { useCurrentCv } from '../../../contexts';

type MenuListProps = {
  items: ListItem[];
  onDeleteItem: (itemId: string) => void;
};

export const MenuCvList = React.memo(
  ({ items, onDeleteItem }: MenuListProps) => {
    const { setCurrentCvId } = useCurrentCv();
    const [isDialogOpen, setIsOpenDialog] = useState(false);

    const openDialog = useCallback((id: string) => setIsOpenDialog(true), []);

    const handleSelectCv = useCallback(
      (id: string) => {
        setCurrentCvId(id);
      },
      [setCurrentCvId]
    );

    const menuOptions = React.useMemo(
      () => [
        {
          label: 'Use as template',
          action: (id: string) => openDialog(id),
        },
        { label: 'Delete', action: onDeleteItem },
      ],
      [openDialog, onDeleteItem]
    );

    return (
      <List>
        {items.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            onSelect={handleSelectCv}
            menuOptions={menuOptions}
          />
        ))}
      </List>
    );
  }
);
