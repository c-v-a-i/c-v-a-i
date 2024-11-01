import React from 'react';
import { Typography, Container, Box } from '@mui/material'

type AboutProps = {
  data: string[]
};

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>whoami</Typography>
      <Typography
        variant="body1"
      >{data.join('\n')}</Typography>
    </Box>
  );
};
