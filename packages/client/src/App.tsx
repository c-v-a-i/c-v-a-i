import { client } from './apollo-client';
import { CvPreview } from './components/cv-preview';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <ToastContainer position={isDesktop ? 'bottom-left' : 'top-right'} />
        {/* <Authentication />*/}
        <CvPreview />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
