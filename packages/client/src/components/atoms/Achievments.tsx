import React from 'react';
import { Section, Header, SubHeader } from './body-components';
import { AchievementData } from '../../model';

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
