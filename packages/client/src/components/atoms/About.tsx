import React from 'react';
import { Typography, Container } from '@mui/material';

type AboutProps = {
  children: React.ReactNode;
};

export const About: React.FC<AboutProps> = ({ children }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>whoami</Typography>
      <Typography variant="body1">{children}</Typography>
    </Container>
  );
};
