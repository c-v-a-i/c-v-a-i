import React from 'react';
import { Typography, Box } from '@mui/material';
import { EditableTypography } from '../EditableTypography';
import type { GetCvInformationQuery } from '../../../generated/graphql';

type AboutProps = {
  data: GetCvInformationQuery['getCv']['aboutMe'];
};

export const AboutMe: React.FC<AboutProps> = ({ data }) => {
  const handleSave = async (newValue: string) => {
    // setText(newValue);
    return Promise.resolve();
  };

  if (!data) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        whoami
      </Typography>

      <EditableTypography
        id={`about-me-${data.id}`}
        value={data.aboutMe}
        onSave={handleSave}
        multiline
        variant="body1"
      />
    </Box>
  );
};
