import { WorkExperienceData } from '@cv-creator/common'

import React from 'react';
import { Section, Header, SubHeader } from './body-components'

interface WorkExperienceProps {
  data: WorkExperienceData[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => (
  <Section>
    <Header>Work Experience</Header>
    {data.map((job, index) => (
      <div key={index}>
        <SubHeader>{job.position}, {job.company}, {job.location}</SubHeader>
        <p>{job.duration}</p>
        <ul>
          {job.responsibilities.map((responsibility, i) => (
            <li key={i}>{responsibility}</li>
          ))}
        </ul>
      </div>
    ))}
  </Section>
);

