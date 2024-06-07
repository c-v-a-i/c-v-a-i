import React from 'react';
import { Container, Typography, Grid, List, ListItem } from '@mui/material';
import { SkillsData } from '@cv-creator/common';

type SkillsProps = {
  data: SkillsData;
};

export const Skills: React.FC<SkillsProps> = ({ data }) => (
  <Container>
    <Typography variant="h4" gutterBottom>Skills</Typography>
    {Object.entries(data).map(([key, value]) => (
      <Grid item key={key} sx={{ marginBottom: '10px' }}>
        <Typography variant="body2"><b>{key}</b>: {value.join(', ')}</Typography>
      </Grid>
    ))}
  </Container>
);
