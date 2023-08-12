import { WorkExperienceData } from '@cv-creator/common'

import React from 'react'
import { Section, Header, SubHeader, Paragraph, ListItem } from './body-components'
import { WithTheme } from '../../types'
import styled from '@emotion/styled'

type WorkExperienceProps = WithTheme<{
  data: WorkExperienceData[]
}>

export const WorkExperience: React.FC<WorkExperienceProps> = ({ data, theme }) => {
  return (
    <Section>
      <Header theme={theme}>Work Experience</Header>
      {data.map((job, index) => (
        <div key={index}>
          <WorkExperienceHeader>
            <SubHeader theme={theme}>{job.position}, {job.company}, {job.location}</SubHeader>
            <Paragraph theme={theme}>[{job.duration}]</Paragraph>
          </WorkExperienceHeader>
          <ul>
            {job.responsibilities.map((responsibility, i) => (
              <ListItem key={i} theme={theme}>{responsibility}</ListItem>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  )
}

const WorkExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`