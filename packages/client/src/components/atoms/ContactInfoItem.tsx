import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { TypographyWithOverflow } from './TypographyWithOverflow';

type ContactInfoItemProps = {
  name: string;
  value: string;
};
export const ContactInfoItem = ({ name, value }: ContactInfoItemProps) => {
  return (
    <Box>
      <Typography variant="h6">{name}</Typography>
      <TypographyWithOverflow>
        <Link href={`${value.includes('@') ? 'mailto:' : value.includes('+') ? 'tel:' : ''}${value}`} underline="hover">
          {value}
        </Link>
      </TypographyWithOverflow>
    </Box>
  );
};
