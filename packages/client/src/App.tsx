import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IndexPage } from './components/IndexPage';
import { apolloClient } from './clients';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/auth-context';
import { theme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <BrowserRouter>
            <IndexPage />
            <ToastContainer
              position={'bottom-left'}
              toastStyle={{
                height: '24px',
              }}
            />
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
