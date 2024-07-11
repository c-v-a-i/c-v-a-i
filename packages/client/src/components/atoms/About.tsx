import React from 'react';
import { Typography, Container } from '@mui/material';

type AboutProps = {
  data: string[]
};

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>whoami</Typography>
      <Typography 
        variant="body1"
        dangerouslySetInnerHTML={{ __html: data.join("<br />")}}
      />
    </Container>
  );
};
