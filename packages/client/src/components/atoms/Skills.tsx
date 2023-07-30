import React from 'react'
import { SkillsData } from '@cv-creator/common'

import { Section, Header, SubHeader } from './body-components'

interface SkillsProps {
  data: SkillsData;
}

export const Skills: React.FC<SkillsProps> = ({ data }) => (
  <Section>
    <Header>Skills</Header>
    <SubHeader>Soft Skills</SubHeader>
    <ul>
      {data.softSkills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
    <SubHeader>Hard Skills</SubHeader>
    <ul>
      {data.hardSkills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
    <SubHeader>Tools</SubHeader>
    <ul>
      {data.tools.map((tool, index) => (
        <li key={index}>{tool}</li>
      ))}
    </ul>
  </Section>
)