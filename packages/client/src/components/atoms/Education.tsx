import type { EducationData } from '@c-v-a-i/common';
import { Typography, Box } from '@mui/material';
import React from 'react';

type EducationProps = {
  data: EducationData[];
};

// TODO make it looks the same as job experience
export const Education: React.FC<EducationProps> = ({ data }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Education
    </Typography>
    {data.map((education, index) => (
      <Box key={index}>
        <Typography variant="h6" sx={{ textWrap: 'nowrap' }}>
          {education.institution}
        </Typography>
        <Typography variant="body2">{education.degree}</Typography>

        <Box display="flex" flexDirection="column">
          {/* <Typography variant="body2">{education.location}</Typography>*/}
          <Typography color="grey" variant="body2">
            [{education.duration}]
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);
