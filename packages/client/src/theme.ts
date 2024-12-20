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
    light: alpha('#d7d7d7', 0.2),
    main: '#b468d5',
    dark: '#9254ad',
    contrastText: '#603772',
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
