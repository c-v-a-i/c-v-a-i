import React from 'react';
import { Typography, Paper, Link, Grid, Box } from '@mui/material'
import { ContactInfoData, name } from '@c-v-a-i/common';
import { ContactInfoItem } from './ContactInfoItem'

type ContactInfoProps = {
  data: ContactInfoData;
};

export const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>{name}</Typography>

      {/*<Grid container spacing={2}>*/}
      {/*  {Object.entries(data).map(([key, value]) => (*/}
      {/*    <Grid item xs={12} sm={12} md={6} key={key}>*/}
      {/*      <ContactInfoItem name={key} value={value} />*/}
      {/*    </Grid>*/}
      {/*  ))}*/}
      {/*</Grid>*/}
    </Box>
  );
};
