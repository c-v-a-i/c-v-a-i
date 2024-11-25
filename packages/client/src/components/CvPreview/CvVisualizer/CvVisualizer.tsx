import React from 'react';
import { Box, Divider } from '@mui/material';
import type { GetCvInformationQuery } from '../../../generated/graphql';
import { AboutMe } from './AboutMe';
import { widthToPerc } from '../../utils';
import { Education } from './Education';
import { ContactInfo } from './ContactInfo';
import { WorkExperience } from './WorkExperience';
import { Projects } from './Projects';
import { Skills } from './Skills';

type CvVisualizerProps = {
  cvData: GetCvInformationQuery['getCv'];
};

export const CvVisualizer = ({ cvData: { id } }: CvVisualizerProps) => {
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
      <Box display="flex" flexDirection="column" sx={{ width: '100%', gap: '20px' }}>
        <ContactInfo cvId={id} />
        <AboutMe cvId={id} />
      </Box>

      <Divider flexItem />

      <Box display="flex" gap="80px" sx={{ overflowX: 'hidden' }}>
        <Box width={widthToPerc(8 / 12)} display="flex" flexDirection="column" gap={3}>
          <WorkExperience cvId={id} />

          <Divider />

          <Projects cvId={id} />
        </Box>

        <Box width={widthToPerc(4 / 12)}>
          <Box display="flex" flexDirection="column" gap="16px" sx={{ textAlign: 'end' }}>
            <Education cvId={id} />

            <Skills cvId={id} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
