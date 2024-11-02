import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export interface BaseGqlComponentProps {
  redirectOnErrorUrl?: string;
  loader?: JSX.Element;
  disableLoader?: boolean;
}

export const LoaderElement = () => (
  <Box p={1}>
    <CircularProgress />
  </Box>
);
