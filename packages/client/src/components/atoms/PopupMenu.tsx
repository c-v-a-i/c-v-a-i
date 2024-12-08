import React, { useState } from 'react';
import type { IconButtonProps } from '@mui/material';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

export type OptionsMenuProps = IconButtonProps & {
  id: string;
  options: { label: string; action: (id: string) => void }[];
};

export const PopupMenu: React.FC<OptionsMenuProps> = ({ options, id, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (action: () => void) => {
    handleMenuClose();
    action();
  };

  return (
    <>
      <IconButton edge="end" aria-label="options" onClick={handleMenuOpen} {...props}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        // PaperProps={{
        //   elevation: 2,
        //   sx: { minWidth: 150 },
        // }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(() => option.action(id))}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
