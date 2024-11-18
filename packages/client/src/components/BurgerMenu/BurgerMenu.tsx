import React, { useState, useCallback, useMemo } from 'react';
import { Drawer as DrawerMui, Box, Button, styled } from '@mui/material';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { MenuHeader } from './MenuHeader';
import { MenuList } from './MenuList';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import type { ListItem } from './MenuList/types';
import { BadgeButton } from './BadgeButton';
import { useUser } from '../../contexts/use-user';

type BurgerMenuProps = {
  items: ListItem[];
  onAddItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
};

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

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ items, onAddItem, onDeleteItem }) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { user, logout } = useUser();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedItemId) {
      onDeleteItem(selectedItemId);
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
    }
  }, [selectedItemId, onDeleteItem]);

  const cancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  }, []);

  const memoizedItems = useMemo(() => items, [items]);

  return (
    <>
      <BadgeButton onClick={open ? handleDrawerClose : handleDrawerOpen} isOpen={open}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </BadgeButton>
      <Drawer open={open}>
        <DrawerContainer>
          <MenuHeader user={user} onClose={handleDrawerClose} />
          <MenuList items={memoizedItems} onAddItem={onAddItem} onDeleteItem={handleDelete} />
          <Box sx={{ marginTop: 'auto', padding: 2 }}>
            <Button variant="outlined" color="secondary" fullWidth onClick={logout}>
              Logout
            </Button>
          </Box>
        </DrawerContainer>
      </Drawer>
      <MainContent open={open}>{/* The rest of your page content goes here */}</MainContent>
      <DeleteConfirmationDialog open={deleteDialogOpen} onConfirm={confirmDelete} onCancel={cancelDelete} />
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
