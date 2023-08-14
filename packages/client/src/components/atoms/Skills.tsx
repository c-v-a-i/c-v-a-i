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
      {
        Object.entries(data).map(([key, value]) => (
            <div>
              <SubHeader theme={theme}>{key}</SubHeader>
              <ul>
                {value.map((skill, index) => (
                  <ListItem theme={theme} key={index}>{skill}</ListItem>
                ))}
              </ul>
            </div>
        ))
      }
    </SkillsWrapper>
  </Section>
)

const SkillsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`