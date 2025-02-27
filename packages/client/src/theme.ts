import { alpha, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const customPalette = {
  primary: {
    light: '#dadef2',
    main: '#bfbfc4',
    dark: '#7d7d81',
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

// TODO: define spacings
export const theme = createTheme({
  palette: {
    ...customPalette,
    text: {
      primary: customPalette.primary.contrastText,
      secondary: customPalette.secondary.contrastText,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '32px',
        },
      },
    },
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
      // on hover, text color should be brighter
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: customPalette.primary.contrastText,
            backgroundColor: customPalette.primary.main,
            '&:hover': {
              backgroundColor: alpha(customPalette.primary.main, 0.8),
              color: customPalette.primary.contrastText,
              boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: customPalette.primary.main,
            borderColor: customPalette.primary.main,
            '&:hover': {
              backgroundColor: customPalette.primary.light,
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'none',
        },
      },
    },
  },
});
