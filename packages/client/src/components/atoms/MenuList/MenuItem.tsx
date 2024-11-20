import React from 'react';
import { ListItemText, ListItemSecondaryAction, Box, ListItem } from '@mui/material';
import type { ListItem as ListItemType } from './types';
import { TypographyWithOverflow } from '../index';
import type { OptionsMenuProps } from './OptionsMenu';
import { OptionsMenu } from './OptionsMenu';

type MenuItemProps = {
  item: ListItemType;
  menuOptions: OptionsMenuProps['options'];
  onSelect: (id: string) => void;
};

export const MenuItem: React.FC<MenuItemProps> = React.memo(({ item, menuOptions, onSelect }) => {
  return (
    <ListItem
      button={true}
      component={Box}
      onClick={() => onSelect(item.id)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ListItemText secondary="">
        <TypographyWithOverflow sx={{ width: '90%' }}>{item.name}</TypographyWithOverflow>
      </ListItemText>
      <ListItemSecondaryAction>
        <OptionsMenu for={item} options={menuOptions} />
      </ListItemSecondaryAction>
    </ListItem>
  );
});
