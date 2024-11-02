import type { ContactInfoData } from '@c-v-a-i/common';
import { name } from '@c-v-a-i/common';
import { Typography, Box } from '@mui/material';
import React from 'react';

type ContactInfoProps = {
  data: ContactInfoData;
};

export const ContactInfo: React.FC<ContactInfoProps> = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {name}
      </Typography>

      {/* <Grid container spacing={2}>*/}
      {/*  {Object.entries(data).map(([key, value]) => (*/}
      {/*    <Grid item xs={12} sm={12} md={6} key={key}>*/}
      {/*      <ContactInfoItem name={key} value={value} />*/}
      {/*    </Grid>*/}
      {/*  ))}*/}
      {/* </Grid>*/}
    </Box>
  );
};
