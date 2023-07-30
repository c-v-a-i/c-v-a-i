import React from 'react';
import { AchievementData } from '@cv-creator/common';

import { Section, Header, SubHeader } from './body-components';

interface AchievementsProps {
  data: AchievementData[];
}

export const Achievements: React.FC<AchievementsProps> = ({ data }) => (
  <Section>
    <Header>Achievements</Header>
    {data.map((achievement, index) => (
      <div key={index}>
        <SubHeader>{achievement.name}</SubHeader>
        <p>{achievement.description}</p>
      </div>
    ))}
  </Section>
);
