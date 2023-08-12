import React from 'react';
import { Section, Header, SubHeader, Paragraph } from './body-components'
import { EducationData } from '@cv-creator/common';
import { WithTheme } from '../../types'
import styled from '@emotion/styled'

type EducationProps = WithTheme<{
  data: EducationData[]
}>

export const Education: React.FC<EducationProps> = ({ data, theme }) => (
  <Section>
    <Header theme={theme}>Education</Header>
    <EducationWrapper>
      {data.map((education, index) => (
        <div key={index}>
          <SubHeader theme={theme}>{education.institution}</SubHeader>
          <Paragraph theme={theme}>{education.degree}</Paragraph>
          <Paragraph theme={theme}>{education.duration}</Paragraph>
        </div>
      ))}
    </EducationWrapper>
  </Section>
);


const EducationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
