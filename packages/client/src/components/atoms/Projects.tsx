import React from 'react'
import { ProjectData } from '@cv-creator/common'

import { Paragraph, Section, Header, SubHeader } from './body-components'
import { WithTheme } from '../../types'

type ProjectsProps = WithTheme<{
  data: ProjectData[]
}>

export const Projects: React.FC<ProjectsProps> = ({ data, theme }) => {
  return (
    <Section>
      <Header theme={theme}>Projects</Header>
      {data.map((project, index) => (
        <div key={index}>
          <SubHeader theme={theme}>{project.name}</SubHeader>
          <Paragraph
            dangerouslySetInnerHTML={{__html: project.description}}
            theme={theme}
          >
          </Paragraph>
        </div>
      ))}
    </Section>
  )
}
