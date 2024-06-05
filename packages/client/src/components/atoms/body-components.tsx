import { Container as MuiContainer, Link as MuiLink, ListItem as MuiListItem, styled, Typography } from '@mui/material'

export const Container = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  // boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
  margin: '0 auto',
}));

export const Section = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  fontSize: '0.9rem',
  lineHeight: '1.5rem',
  padding: theme.spacing(2),
}));

export const Header = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '2rem',
  textAlign: 'center',
  letterSpacing: '0.3rem',
}));

export const SubHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.4rem',
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  marginBottom: theme.spacing(1.25),
  marginLeft: theme.spacing(2),
}));

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
}));

export const Anchor = styled(MuiLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  fontSize: '1rem',

  '&:hover': {
    textDecoration: 'underline',
  },

  '&:visited': {
    color: 'inherit',
  },
}));
