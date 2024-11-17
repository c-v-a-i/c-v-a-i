import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { environment } from '../environment';
import type { paths } from '../generated/api-types';
import { useUser } from '../hooks';

export const LoginButton: React.FC = () => {
  const handleLogin = useCallback(async () => {
    const backendGoogleOAuthUrl: `${typeof environment.apiUrl}${keyof paths}` = `${environment.apiUrl}/auth/google`;

    window.location.href = backendGoogleOAuthUrl;
  }, []);

  return <Button onClick={handleLogin}>Login with Google</Button>;
};

export const IndexPage = () => {
  // get the user using a graphql request
  // if no user exists, show the login page.
  // otherwise, show a <HomePage />
  // HomePage should be a dummy component for now
  // return <CvPreview />;
  const { user, logout, loading } = useUser();

  if (!user) {
    return <LoginButton />;
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '1400px',
      }}
    >
      {JSON.stringify(user, null, 2)}
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};
