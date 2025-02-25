import React from 'react';
import { Box, Avatar, IconButton, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import type { User } from '../../generated/graphql';
import { TypographyWithOverflow } from '../atoms';
import { useUser } from '../../contexts';

type MenuHeaderProps = {
  user: Pick<User, 'firstName' | 'lastName' | 'email'>;
  onClose: () => void;
};

export const MenuHeader: React.FC<MenuHeaderProps> = React.memo(({ user }) => {
  const { logout } = useUser();

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
          <TypographyWithOverflow variant="body2">
            {user.email}
          </TypographyWithOverflow>
        </Box>
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
});
