import React from 'react';
import { Section, Header, SubHeader } from './body-components';
import { EducationData } from '../../model';

interface EducationProps {
  data: EducationData[];
}

export const Education: React.FC<EducationProps> = ({ data }) => (
  <Section>
    <Header>Education</Header>
    {data.map((education, index) => (
      <div key={index}>
        <SubHeader>{education.institution}</SubHeader>
        <p>{education.degree}</p>
        <p>{education.duration}</p>
      </div>
    ))}
  </Section>
);

