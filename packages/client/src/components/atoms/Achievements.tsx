import React from 'react';
import { AchievementData } from '@cv-creator/common';

import { Section, Header, SubHeader, Paragraph } from './body-components'
import { WithTheme } from '../../types'

type AchievementsProps = WithTheme<{
  data: AchievementData[]
}>

export const Achievements: React.FC<AchievementsProps> = ({ data , theme}) => (
  <Section>
    <Header theme={theme}>Achievements</Header>
    {data.map((achievement, index) => (
      <div key={index}>
        <SubHeader theme={theme}>{achievement.name}</SubHeader>
        <Paragraph theme={theme}>{achievement.description}</Paragraph>
      </div>
    ))}
  </Section>
);
