import React from 'react'
import { SkillsData } from '@cv-creator/common'

import { Section, Header, SubHeader, ListItem } from './body-components'
import { WithTheme } from '../../types'
import styled from '@emotion/styled'

type SkillsProps = WithTheme<{
  data: SkillsData;
}>

export const Skills: React.FC<SkillsProps> = ({ data, theme }) => (
  <Section>
    <Header theme={theme}>Skills</Header>
    <SkillsWrapper>

      <div>
        <SubHeader theme={theme}>Soft Skills</SubHeader>
        <ul>
          {data.softSkills.map((skill, index) => (
            <ListItem theme={theme} key={index}>{skill}</ListItem>
          ))}
        </ul>
      </div>

      <div>
        <SubHeader theme={theme}>Hard Skills</SubHeader>
        <ul>
          {data.hardSkills.map((skill, index) => (
            <ListItem theme={theme} key={index}>{skill}</ListItem>
          ))}
        </ul>
      </div>

      <div>
        <SubHeader theme={theme}>Tools</SubHeader>
        <ul>
          {data.tools.map((tool, index) => (
            <ListItem theme={theme} key={index}>{tool}</ListItem>
          ))}
        </ul>
      </div>
    </SkillsWrapper>
  </Section>
)

const SkillsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`