import React, { useState, useCallback } from 'react';
import { Drawer as DrawerMui, Box, Button, styled } from '@mui/material';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { MenuHeader } from './MenuHeader';
import { BadgeButton } from './BadgeButton';
import { useUser } from '../../contexts/use-user';
import { CvMenuList } from './CvMenuList';

const drawerWidth = 300;

const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? `${drawerWidth}px` : 0,
}));

export const BurgerMenu = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useUser();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <BadgeButton onClick={open ? handleDrawerClose : handleDrawerOpen} isOpen={open}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </BadgeButton>
      <Drawer open={open}>
        <DrawerContainer>
          <MenuHeader user={user} onClose={handleDrawerClose} />

          <CvMenuList />

          <Box sx={{ marginTop: 'auto', padding: 2 }}>
            <Button variant="outlined" color="secondary" fullWidth onClick={logout}>
              Logout
            </Button>
          </Box>
        </DrawerContainer>
      </Drawer>
      <MainContent open={open}>{children}</MainContent>
    </>
  );
};

const DrawerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const Drawer = ({ children, open }: React.PropsWithChildren & { open: boolean }) => {
  return (
    <DrawerMui
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      {children}
    </DrawerMui>
  );
};
