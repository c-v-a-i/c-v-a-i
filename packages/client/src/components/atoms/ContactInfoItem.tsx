import { Box, Link, Typography } from '@mui/material'
import React from 'react'

type ContactInfoItemProps = {
  name: string;
  value: string;
}
export const ContactInfoItem = ({name, value}: ContactInfoItemProps) => {
  return (
    <Box>
      <Typography variant="h6">{name}</Typography>
      <Link href={`${value.includes('@') ? 'mailto:' : value.includes('+') ? 'tel:' : ''}${value}`} underline="hover">
        {value}
      </Link>
    </Box>
  )
}
