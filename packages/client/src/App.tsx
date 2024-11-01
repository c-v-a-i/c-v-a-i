import React from 'react'
import {Authentication} from "./components/authentication/Authentication";
import {ApolloProvider } from "@apollo/client";
import { ToastContainer} from 'react-toastify';
import {ThemeProvider, useMediaQuery, useTheme} from "@mui/material";
import {client} from "./apollo-client";


const App: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <ToastContainer position={isDesktop ? 'bottom-left' : 'top-right'} />
          <Authentication />
          {/*// <CvPreview />*/}
        </ApolloProvider>
      </ThemeProvider>
  )
}

export default App
