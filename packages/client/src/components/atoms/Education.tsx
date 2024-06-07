import React from 'react';
import { Container, Typography, Grid, List, ListItem } from '@mui/material';
import { EducationData } from '@cv-creator/common';

type EducationProps = {
  data: EducationData[];
};

// TODO make it looks the same as job experience
export const Education: React.FC<EducationProps> = ({ data }) => (
  <Container>
    <Typography variant="h4" gutterBottom>Education</Typography>
    {data.map((education, index) => (
      <Container key={index} sx={{ marginBottom: '20px' }}>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">{education.institution}</Typography>
            <Typography variant="body2">{education.degree}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{education.location}</Typography>
            <Typography variant="body2">[{education.duration}]</Typography>
          </Grid>
        </Grid>
        <List>
          <ListItem>
            <Typography variant="body2" dangerouslySetInnerHTML={{ __html: education.description }}></Typography>
          </ListItem>
        </List>
        <Typography variant="body2">Keywords: {education.keywords.join(', ')}.</Typography>
      </Container>
    ))}
  </Container >
);
