import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { client } from './apollo-client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { IndexPage } from './components/IndexPage';

const App: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <IndexPage />
          <ToastContainer position={isDesktop ? 'bottom-left' : 'top-right'} />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
