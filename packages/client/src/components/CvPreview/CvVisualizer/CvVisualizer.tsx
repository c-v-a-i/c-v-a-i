import React from 'react';
import { Box, Divider } from '@mui/material';
import { widthToPerc } from '../../utils';
import { ContactInfo } from './CvFields';
import { AboutMe } from './CvFields/AboutMe';
import { WorkExperience } from './CvFields/WorkExperience';
import { Projects } from './CvFields/Projects';
import { Education } from './CvFields/Education';
import { Skills } from './CvFields/Skills';

type CvVisualizerProps = {
  cvId: string;
};

export const CvVisualizer = ({ cvId }: CvVisualizerProps) => {
  return (
    <Box
      sx={{
        gap: '40px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1400px',
        padding: '80px 80px',
        justifyContent: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: '100%', gap: '20px' }}
      >
        <ContactInfo cvId={cvId} />
        <AboutMe cvId={cvId} />
      </Box>

      <Divider flexItem />

      <Box display="flex" gap="80px" sx={{ overflowX: 'hidden' }}>
        <Box
          width={widthToPerc(8 / 12)}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <WorkExperience cvId={cvId} />
          <Divider />
          <Projects cvId={cvId} />
        </Box>

        <Box width={widthToPerc(4 / 12)}>
          <Box
            display="flex"
            flexDirection="column"
            gap="16px"
            sx={{ textAlign: 'end' }}
          >
            <Education cvId={cvId} />
            <Skills cvId={cvId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
