import React from 'react';
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import { RemoveEntryButton } from '../../atoms';
import { usePreviewMode } from '../../../contexts';

type WithRemoveEntryButtonProps = React.PropsWithChildren<{
  removeEntry: () => {};
}> &
  BoxProps;

export const WithRemoveEntryButton = ({
  children,
  removeEntry,
  flexDirection = 'row',
  height,
  ...props
}: WithRemoveEntryButtonProps) => {
  const { isPreviewing } = usePreviewMode();

  return (
    <Box
      display={'flex'}
      justifyContent={'start'}
      flexDirection={flexDirection}
      height={height}
      alignItems={'flex-start'}
      {...props}
    >
      {!isPreviewing && <RemoveEntryButton onClick={removeEntry} />}
      {children}
    </Box>
  );
};
