import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Drawer as DrawerMui, Box, Button, styled } from '@mui/material';

import { MenuHeader } from './MenuHeader';
import { usePreviewMode, useUser } from '../../contexts';
import { CvMenuList } from './CvMenuList';
import { BadgeButton } from './BadgeButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 300;

const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  height: '100vh',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? `${drawerWidth}px` : 0,
}));

export const BurgerMenu = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useUser();
  const { isPreviewing } = usePreviewMode();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);
  const savedState = useRef(false);

  useEffect(() => {
    if (isPreviewing) {
      setOpen((prev) => {
        savedState.current = prev;
        return false;
      });
    } else {
      setOpen(savedState.current);
    }
  }, [isPreviewing, handleDrawerClose]);

  return (
    <>
      {!isPreviewing && (
        <BadgeButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          isOpen={open}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </BadgeButton>
      )}
      <Drawer open={open}>
        <DrawerContainer>
          <MenuHeader user={user} onClose={handleDrawerClose} />

          <CvMenuList />

          <Box sx={{ marginTop: 'auto', padding: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={logout}
            >
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

const Drawer = ({
  children,
  open,
}: React.PropsWithChildren & { open: boolean }) => {
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
