import type { ReactNode } from 'react';
import React from 'react';
import { styled } from '@mui/material';
import { Box } from '../Box';

interface ListContainerProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  headerComponent?: ReactNode;
}

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Prevents container overflow
  backgroundColor: 'transparent',
}));

export const ListContainer: React.FC<ListContainerProps> = ({
  children,
  width = '100%',
  height = '100%',
  headerComponent,
}) => {
  return (
    <Container sx={{ width, height }}>
      {headerComponent}
      {children}
    </Container>
  );
};
