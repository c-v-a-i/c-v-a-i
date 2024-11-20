import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { environment } from '../environment';
import { BurgerMenu } from './BurgerMenu';
import { useAuth } from '../contexts/use-auth';
import { CurrentUserProvider } from '../contexts/use-user';
import type { Cv } from '../generated/graphql';
import { CurrentCvProvider } from '../contexts/use-current-cv';
import { CurrentCvPreview } from './CvPreview';

type Hui = Cv;

export const LoginButton: React.FC = () => {
  const handleLogin = useCallback(() => {
    const backendGoogleOAuthUrl = `${environment.apiUrl}/auth/google`;
    window.location.href = backendGoogleOAuthUrl;
  }, []);

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export const IndexPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginButton />;
  }

  return (
    <CurrentUserProvider user={user} logout={logout}>
      <CurrentCvProvider>
        <Box sx={{ display: 'flex' }}>
          <BurgerMenu>
            <CurrentCvPreview />
            {/* <CvPreview />*/}
          </BurgerMenu>
        </Box>
      </CurrentCvProvider>
    </CurrentUserProvider>
  );
};
