import { ProjectData } from '@cv-creator/common';
import { Container, Typography } from '@mui/material';
import React from 'react';

type ProjectsProps = {
  data: ProjectData[];
};

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      {data.map((project, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <Typography variant="h6">{project.name}</Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: project.description }}></Typography>
        </div>
      ))}
    </Container>
  );
};
