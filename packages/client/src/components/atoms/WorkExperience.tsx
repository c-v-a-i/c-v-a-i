import React from 'react';
import { Container, Typography, Paper, Grid, List, ListItem } from '@mui/material';
import { WorkExperienceData } from '@cv-creator/common';

type WorkExperienceProps = {
  data: WorkExperienceData[];
};

// create data display component for work experience & education
export const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Work Experience</Typography>
      {data.map((job, index) => (
        <Container key={index} sx={{ marginBottom: '20px' }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">{job.position}, {job.company}, {job.location}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">[{job.duration}]</Typography>
            </Grid>
          </Grid>
          <List>
            {job.responsibilities.map((responsibility, i) => (
              <ListItem key={i}>
                <Typography variant='body2'>
                  {responsibility}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Container>
      ))}
    </Container>
  );
};
