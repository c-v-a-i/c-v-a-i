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
        <Typography variant="h6">{education.institution}</Typography>
        <List>
          <ListItem>
            <Typography variant="body2">{education.degree}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">{education.duration}</Typography>
          </ListItem>
        </List>
      </Container>
    ))}
  </Container>
);
