import React from 'react';
import { ListItemText, ListItemSecondaryAction, Box, ListItem } from '@mui/material';
import type { ListItem as ListItemType } from './types';
import { TypographyWithOverflow } from '../index';
import type { OptionsMenuProps } from '../PopupMenu';
import { PopupMenu } from '../PopupMenu';
import { useEditableTypographyBase } from '../../../hooks';
import { EditableTypographyBase } from '../Typography/EditableTypographyBase';

type MenuItemProps = {
  item: ListItemType;
  menuOptions: OptionsMenuProps['options'];
  onSelect: (id: string) => void;
};

export const MenuItem = React.memo(({ item, menuOptions, onSelect }: MenuItemProps) => {
  const { isEditing, startEditing, tempValue, setTempValue, handleSave, handleCancel } = useEditableTypographyBase({
    value: item.name,
    onSave: async () => {
      alert('Document renamed');
    },
  });

  if (isEditing) {
    return (
      <ListItem component={Box}>
        <ListItemText>
          <EditableTypographyBase
            id={`menu-item-${item.id}`}
            isEditing={isEditing}
            tempValue={tempValue}
            setTempValue={setTempValue}
            handleSave={handleSave}
            handleCancel={handleCancel}
            value={item.name}
          />
        </ListItemText>
      </ListItem>
    );
  }
  return (
    <ListItem
      button={!isEditing}
      component={Box}
      onClick={isEditing ? undefined : () => onSelect(item.id)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ListItemText>
        <TypographyWithOverflow sx={{ width: '90%' }}>{item.name}</TypographyWithOverflow>
      </ListItemText>
      <ListItemSecondaryAction>
        <PopupMenu
          id={item.id}
          options={[
            {
              label: 'Rename',
              action: startEditing,
            },
            ...menuOptions,
          ]}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
});
