import { IconButton, styled } from '@mui/material';

export const BadgeButton = styled(IconButton)<{ isOpen: boolean }>(
  ({ theme, isOpen }) => ({
    position: 'fixed',
    top: '50%',
    left: 0,
    borderRadius: '20px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },

    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    transform: isOpen
      ? 'translate(-50%, -50%) rotate(180deg)'
      : 'translate(-50%, -50%) rotate(0deg)',
  })
);
