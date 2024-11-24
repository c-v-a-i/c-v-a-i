import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import type { GetCvInformationQuery } from '../../../generated/graphql';
import { EditableTypography } from '../EditableTypography';

type WorkExperienceProps = {
  data: GetCvInformationQuery['getCv']['workExperienceEntries'];
};

export const WorkExperience: React.FC<WorkExperienceProps> = ({ data }) => {
  // const [updateWorkExperience] = useUpdateWorkExperienceMutation();

  // const handleUpdate = async (id: string, field: keyof UpdateWorkExperienceInput, value: string | string[]) => {
  //   const input: UpdateWorkExperienceInput = { id, [field]: value };
  //   await updateWorkExperience({ variables: { input } });
  // };
  const handleUpdate = (id: string, key: string, value: string) => {
    return Promise.resolve();
  };
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Work Experience
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {data.map((job) => (
          <Box key={job.id}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} sm={8}>
                <EditableTypography
                  id={`job-position-${job.id}`}
                  value={job.position}
                  onSave={(value) => handleUpdate(job.id, 'position', value)}
                  variant="h6"
                />
                <EditableTypography
                  id={`job-name-${job.id}`}
                  value={job.name}
                  onSave={(value) => handleUpdate(job.id, 'name', value)}
                  variant="h6"
                />
                {job.type && (
                  <EditableTypography
                    id={`job-type-${job.id}`}
                    value={job.type}
                    onSave={(value) => handleUpdate(job.id, 'type', value)}
                    variant="body2"
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={4} textAlign="right">
                <EditableTypography
                  id={`job-location-${job.id}`}
                  value={job.location}
                  onSave={(value) => handleUpdate(job.id, 'location', value)}
                  variant="body2"
                />
                {job.duration && (
                  <EditableTypography
                    id={`job-duration-${job.id}`}
                    value={job.duration}
                    onSave={(value) => handleUpdate(job.id, 'duration', value)}
                    variant="body2"
                  />
                )}
              </Grid>
            </Grid>
            <EditableTypography
              id={`job-description-${job.id}`}
              value={job.description}
              onSave={(value) => handleUpdate(job.id, 'description', value)}
              multiline
            />
            {job.skills.length > 0 && (
              <Typography variant="body2" color={grey[600]}>
                Skills: {job.skills.join(', ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
