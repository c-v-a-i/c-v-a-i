import React from 'react';
import { Container, Typography, Paper, Link, Grid } from '@mui/material';
import { ContactInfoData, name } from '@cv-creator/common';

type ContactInfoProps = {
  data: ContactInfoData;
};

export const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>{name}</Typography>
      <Typography variant="h5" gutterBottom>Contact Information</Typography>
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography variant="body1"><b>{key}</b></Typography>
            <Link href={`${value.includes('@') ? 'mailto:' : value.includes('+') ? 'tel:' : ''}${value}`} underline="hover">
              {value}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
