import { alpha, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const customPalette = {
  primary: {
    light: '#d6d6dc',
    main: '#757575',
    dark: '#7d7d81',
    contrastText: '#17171a',
  },
  secondary: {
    light: alpha('#d7d7d7', 0.2),
    main: '#7d7d81',
    dark: '#17171a',
    contrastText: '#000',
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
    surface: '#FFFFFF',
  },
};

export const shadowStyles = {
  section: {
    boxShadow: `-2px 2px 8px ${alpha('#000', 0.25)}`,
  },
} as const;

const radius = {
  small: '12px',
  medium: '16px',
  large: '24px',
  full: '9999px',
};

const outlinedInputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: radius.small,
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
  borderRadius: radius.small,
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

export const backgroundWithBackdrop = {
  background: alpha(customPalette.background.paper, 0.9),
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)', // For Safari support
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.small,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: radius.small,
        },
      },
    },
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
          ...backgroundWithBackdrop,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius.medium,
          ...backgroundWithBackdrop,
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
          borderRadius: radius.small,
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
          borderRadius: radius.medium,
          boxShadow: 'none',
        },
      },
    },
  },
});
