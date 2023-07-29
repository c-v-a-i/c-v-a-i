import React from 'react';
import { Section, Header, SubHeader } from './body-components';
import { ProjectData } from '../../model';

interface ProjectsProps {
  data: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => (
  <Section>
    <Header>Projects</Header>
    {data.map((project, index) => (
      <div key={index}>
        <SubHeader>{project.name}</SubHeader>
        <p>{project.description}</p>
      </div>
    ))}
  </Section>
);

