import React from 'react';
import { Box } from '@mui/material';
import { RemoveEntryButton } from '../../atoms';
import { usePreviewMode } from '../../../contexts';

type WithRemoveEntryButtonProps = React.PropsWithChildren<{
  removeEntry: () => {};
  flexDirection?: 'row' | 'row-reverse';
}>;

export const WithRemoveEntryButton = ({
  children,
  removeEntry,
  flexDirection = 'row',
}: WithRemoveEntryButtonProps) => {
  const { isPreviewing } = usePreviewMode();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'start'}
      flexDirection={flexDirection}
      width={'fit-content'}
    >
      {children}
      {!isPreviewing && <RemoveEntryButton onClick={removeEntry} />}
    </Box>
  );
};
