import type { AchievementData } from '@c-v-a-i/common';
import { Container, Typography } from '@mui/material';
import React from 'react';

type AchievementsProps = {
  data: AchievementData[];
};

export const Achievements: React.FC<AchievementsProps> = ({ data }) => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Achievements
    </Typography>
    {data.map((achievement, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <Typography variant="h6">{achievement.name}</Typography>
        <Typography variant="body2">{achievement.description}</Typography>
      </div>
    ))}
  </Container>
);
