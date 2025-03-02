import { Box as BoxMui, styled } from '@mui/material';

export const Box = styled(BoxMui)(() => ({
  overflow: 'auto',
  scrollbarWidth: 'none' /* Firefox */,
  msOverflowStyle: 'none' /* IE/Edge */,
  '&::-webkit-scrollbar': {
    /* WebKit */ display: 'none',
  },
}));
