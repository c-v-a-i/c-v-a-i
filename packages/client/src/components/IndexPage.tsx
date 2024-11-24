import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { environment } from '../environment';
import { BurgerMenu } from './BurgerMenu';
import { useAuth } from '../contexts/use-auth';
import { CurrentUserProvider } from '../contexts/use-user';
import { CurrentCvProvider } from '../contexts/use-current-cv';
import { CurrentCvPreview } from './CvPreview';
import { CenteredBox } from './atoms';

export const LoginButton: React.FC = () => {
  const handleLogin = useCallback(() => {
    const backendGoogleOAuthUrl = `${environment.apiUrl}/auth/google`;
    window.location.href = backendGoogleOAuthUrl;
  }, []);

  return (
    <Button variant={'outlined'} onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export const IndexPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <CenteredBox sx={{ height: '100vh' }}>
        <LoginButton />
      </CenteredBox>
    );
  }

  return (
    <CurrentUserProvider user={user} logout={logout}>
      <CurrentCvProvider>
        <Box sx={{ display: 'flex' }}>
          <BurgerMenu>
            <CurrentCvPreview />
          </BurgerMenu>
        </Box>
      </CurrentCvProvider>
    </CurrentUserProvider>
  );
};
