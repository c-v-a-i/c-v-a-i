import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { ListItem as ListItemType } from './types';

export type OptionsMenuProps = {
  for: ListItemType;
  options: { label: string; action: (id: ListItemType['id']) => void }[];
};

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ options, for: item }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (action: (id: string) => void) => {
    handleMenuClose();
    action();
  };

  return (
    <>
      <IconButton edge="end" aria-label="options" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 2,
          sx: { minWidth: 150 },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(() => option.action(item.id))}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
