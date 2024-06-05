import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { AchievementData } from '@cv-creator/common';

type AchievementsProps = {
  data: AchievementData[];
};

export const Achievements: React.FC<AchievementsProps> = ({ data }) => (
  <Container>
    {/* <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}> */}
      <Typography variant="h4" gutterBottom>Achievements</Typography>
      {data.map((achievement, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <Typography variant="h6">{achievement.name}</Typography>
          <Typography variant="body2">{achievement.description}</Typography>
        </div>
      ))}
    {/* </Paper> */}
  </Container>
);
