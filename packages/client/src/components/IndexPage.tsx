import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { environment } from '../environment';
import { WithActionsMenu } from './WithActionsMenu';
import { CurrentCvPreview } from './CvPreview';
import { CenteredBox } from './atoms';
import {
  CurrentCvProvider,
  CurrentUserProvider,
  CvCreationFlowProvider,
  DialogProvider,
  PreviewModeProvider,
  useAuth,
} from '../contexts';
import { CvCreationDialog } from './CreateCvFlow';

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
        <DialogProvider>
          <CvCreationFlowProvider>
            <PreviewModeProvider>
              <Box sx={{ display: 'flex' }}>
                <WithActionsMenu>
                  <CurrentCvPreview />
                </WithActionsMenu>
              </Box>
            </PreviewModeProvider>

            <CvCreationDialog />
          </CvCreationFlowProvider>
        </DialogProvider>
      </CurrentCvProvider>
    </CurrentUserProvider>
  );
};
