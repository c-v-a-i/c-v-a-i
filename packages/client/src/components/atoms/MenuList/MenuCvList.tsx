import React, { useCallback } from 'react';
import { List } from '@mui/material';
import { MenuItem } from './MenuItem';
import type { ListItem } from './types';
import { useCurrentCv, useCvCreationFlow, useDialog } from '../../../contexts';

type MenuListProps = {
  items: ListItem[];
  onDeleteItem: (itemId: string) => void;
  onDuplicateItem: (itemId: string) => void;
};

export const MenuCvList = React.memo(
  ({ items, onDeleteItem, onDuplicateItem }: MenuListProps) => {
    const { setCurrentCvId, currentCvId } = useCurrentCv();
    const { open: openDialog } = useDialog();
    const { setTemplateId } = useCvCreationFlow();

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
          action: (id: string) => {
            setTemplateId(id);
            openDialog();
          },
        },
        { label: 'Delete', action: onDeleteItem },
        { label: 'Duplicate', action: onDuplicateItem },
      ],
      [onDeleteItem, onDuplicateItem, setTemplateId, openDialog]
    );

    return (
      <List>
        {items.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            onSelect={handleSelectCv}
            menuOptions={menuOptions}
            isSelected={currentCvId === item._id}
          />
        ))}
      </List>
    );
  }
);
