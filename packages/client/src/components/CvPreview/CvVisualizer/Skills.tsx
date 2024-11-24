import React from 'react';
import { Typography, Box } from '@mui/material';
import type { GetCvInformationQuery } from '../../../generated/graphql';

type SkillsProps = {
  data: GetCvInformationQuery['getCv']['skillEntries'];
};

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      {data.map((skillSection) => (
        <Box key={skillSection.id} mb={2}>
          <Typography variant="h5">{skillSection.category}</Typography>
          {skillSection.items.map((skill) => (
            <Typography key={skill} color="grey" sx={{ textAlign: 'end', textWrap: 'revert' }}>
              {skill}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};
