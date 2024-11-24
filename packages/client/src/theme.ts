import { alpha, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const customPalette = {
  primary: {
    light: '#dadef2',
    main: '#737580',
    dark: '#16161a',
    contrastText: '#17171a',
  },
  secondary: {
    light: alpha('#f0ebf2', 0.6),
    main: '#7c7380',
    dark: '#19171a',
    contrastText: '#302933',
  },
  error: {
    light: '#c47686',
    main: '#a15e6d',
    dark: '#7e4754',
    contrastText: '#5b2f3b',
  },
  background: {
    default: '#FAFBFF',
    paper: '#FAFBFF',
  },
};

export const theme = createTheme({
  palette: {
    ...customPalette,
    text: {
      primary: customPalette.primary.dark,
      secondary: customPalette.secondary.dark,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: customPalette.secondary.light,
          borderRadius: '10px',
          padding: '2px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottomColor: grey[500],
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: grey[700],
          },
          '&.Mui-focused:after': {
            borderBottomColor: grey[900],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
  },
});
