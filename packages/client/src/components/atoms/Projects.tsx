import type { ProjectData } from '@c-v-a-i/common';
import { Box, Typography } from '@mui/material';
import React from 'react';

type ProjectsProps = {
  data: ProjectData[];
};

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      {data.map((project, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <Typography variant="h6">{project.name}</Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: project.description }}></Typography>
        </div>
      ))}
    </Box>
  );
};
