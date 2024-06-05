import React from 'react';
import { Container, Typography, Grid, List, ListItem } from '@mui/material';
import { SkillsData } from '@cv-creator/common';

type SkillsProps = {
  data: SkillsData;
};

export const Skills: React.FC<SkillsProps> = ({ data }) => (
  <Container>
    {/* <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}> */}
      <Typography variant="h4" gutterBottom>Skills</Typography>
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography variant="h6">{key}</Typography>
            <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {value.map((skill, index) => (
                <ListItem key={index}>{skill}</ListItem>
              ))}
            </List>
          </Grid>
            
        ))}
      </Grid>
    {/* </Paper> */}
  </Container>
);
