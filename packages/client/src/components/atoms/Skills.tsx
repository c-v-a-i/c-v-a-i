import type { SkillsData } from '@c-v-a-i/common';
import { Typography, Grid, Box } from '@mui/material';
import React from 'react';

type SkillsProps = {
  data: SkillsData;
};

export const Skills: React.FC<SkillsProps> = ({ data }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Skills
    </Typography>
    {Object.entries(data).map(([skillSectionName, value]) => (
      <Grid item key={skillSectionName} sx={{ marginBottom: '10px' }}>
        <Typography variant="h5">{skillSectionName}</Typography>
        {/* <List>*/}
        {value.map((skill) => (
          // <ListItem sx={{
          //   // padding: "4px 16px",
          //   display: 'flex',
          //   justifyContent: 'end',
          //   textWrap: "nowrap"
          // }} key={skill}>{skill}</ListItem>
          <Typography color="grey" key={skill} sx={{ textAlign: 'end', textWrap: 'revert' }}>
            {skill} -
          </Typography>
        ))}
        {/* </List>*/}
      </Grid>
    ))}
  </Box>
);
