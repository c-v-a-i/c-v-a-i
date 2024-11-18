import React from 'react';
import { Box, Avatar, IconButton, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { User } from '../../generated/graphql';
import { TypographyWithOverflow } from '../atoms';

type MenuHeaderProps = {
  user: Omit<User, 'cvs'>;
  onClose: () => void;
};

export const MenuHeader: React.FC<MenuHeaderProps> = React.memo(({ user, onClose }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Avatar>{user.firstName.charAt(0)}</Avatar>
        <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
          <TypographyWithOverflow variant="h6">
            {user.firstName} {user.lastName}
          </TypographyWithOverflow>
          <TypographyWithOverflow variant="body2">{user.email}</TypographyWithOverflow>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
});
