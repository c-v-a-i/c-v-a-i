import { alpha, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const customPalette = {
  primary: {
    light: '#d6d6dc',
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

const outlinedInputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:not(:hover) .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
};
const inputStyles = {
  background: customPalette.secondary.light,
  borderRadius: '14px',
};
const variantsWithNoBorders = (['outlined', 'filled', 'standard'] as const).map(
  (variant) => ({
    props: { variant },
    style: outlinedInputStyles,
  })
);

const containedStyle = {
  color: customPalette.primary.contrastText,
  backgroundColor: customPalette.primary.light,
  '&:hover': {
    backgroundColor: alpha(customPalette.primary.light, 0.8),
    color: customPalette.primary.contrastText,
    boxShadow: '0px 0px',
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
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': containedStyle,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: customPalette.primary.dark,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: alpha(customPalette.background.paper, 0.9),
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)', // For Safari support
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '32px',
          background: alpha(customPalette.background.paper, 0.9),
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)', // For Safari support
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#000', 0.2), // Lighter backdrop for better blur visibility
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: inputStyles,
      },
      variants: variantsWithNoBorders,
    },
    MuiSelect: {
      styleOverrides: {
        root: inputStyles,
      },
      variants: variantsWithNoBorders,
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          background: customPalette.secondary.light,
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
      variants: [
        {
          props: { variant: 'contained' },
          style: containedStyle,
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
