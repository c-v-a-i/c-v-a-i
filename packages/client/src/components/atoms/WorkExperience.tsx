import React from 'react';
import { Typography, Paper, Grid, List, ListItem, Box } from '@mui/material'
import { WorkExperienceData } from '@c-v-a-i/common';

type WorkExperienceProps = {
  data: WorkExperienceData[];
};

// create data display component for work experience & education
export const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Work Experience</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
      {data.map((job, index) => (
        <Box key={index}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">{job.position}, {job.company}</Typography>
              <Typography color="grey" variant="body2"><i>{job.type}</i></Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{job.location}, </Typography>
              <Typography variant="body2">[{job.duration}]</Typography>
            </Grid>
          </Grid>
          <Typography variant='body2'>
            {job.responsibilities.join('\n')}
          </Typography>
        </Box>
      ))}
      </Box>
    </Box>
  );
};
