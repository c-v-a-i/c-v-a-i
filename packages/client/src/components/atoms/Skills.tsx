import React from 'react';
import { Container, Typography, Grid, List, ListItem, Box } from '@mui/material'
import { SkillsData } from '@c-v-a-i/common';

type SkillsProps = {
  data: SkillsData;
};

export const Skills: React.FC<SkillsProps> = ({ data }) => (
  <Box>
    <Typography variant="h4" gutterBottom>Skills</Typography>
    {Object.entries(data).map(([skillSectionName, value]) => (
      <Grid item key={skillSectionName} sx={{ marginBottom: '10px' }}>
        <Typography variant="h5">
          {skillSectionName}
        </Typography>
        {/*<List>*/}
          {value.map((skill) => (
            // <ListItem sx={{
            //   // padding: "4px 16px",
            //   display: 'flex',
            //   justifyContent: 'end',
            //   textWrap: "nowrap"
            // }} key={skill}>{skill}</ListItem>
            <Typography color="grey" key={skill} sx={{ textAlign: 'end' }}>{skill} -</Typography>
          ))}
        {/*</List>*/}
      </Grid>
    ))}
  </Box>
);
