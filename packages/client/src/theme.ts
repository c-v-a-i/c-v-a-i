import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Fira Code, monospace',
    body2: {
      lineHeight: 1.7,
    },
  },
  // components: {
  //   MuiTypography: {
  //     styleOverrides: {
  //       body2: {
  //         lineHeight: 1.7,
  //       },
  //     },
  //   },
  // },
});
