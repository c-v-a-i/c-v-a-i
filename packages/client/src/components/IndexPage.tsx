import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import { environment } from '../environment';
import { CvPreview } from './cv-preview';
import { BurgerMenu } from './BurgerMenu';
import type { ListItem } from './BurgerMenu/MenuList/types';
import { useAuth } from '../contexts/use-auth';
import { CurrentUserProvider } from '../contexts/use-user';

export const LoginButton: React.FC = () => {
  const handleLogin = useCallback(() => {
    const backendGoogleOAuthUrl = `${environment.apiUrl}/auth/google`;
    window.location.href = backendGoogleOAuthUrl;
  }, []);

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export const IndexPage = () => {
  const { user, logout } = useAuth();

  const [items, setItems] = useState<ListItem[]>([
    { id: '1', name: 'Item One' },
    { id: '2', name: 'Item Two' },
    { id: '3', name: 'Item Three' },
  ]);

  const onAddItem = useCallback((itemId: string) => {
    // Implement your add item logic here
    console.log(`Add item with ID: ${itemId}`);
  }, []);

  const onDeleteItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  if (!user) {
    return <LoginButton />;
  }

  return (
    <CurrentUserProvider user={user} logout={logout}>
      <Box sx={{ display: 'flex' }}>
        <BurgerMenu items={items} onAddItem={onAddItem} onDeleteItem={onDeleteItem} />
        {/* Rest of your page content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Main content goes here */}
          <CvPreview />
        </Box>
      </Box>
    </CurrentUserProvider>
  );
};
