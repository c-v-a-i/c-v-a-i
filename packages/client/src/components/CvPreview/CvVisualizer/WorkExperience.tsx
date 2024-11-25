import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';
import type { UpdateWorkExperienceEntryMutationVariables } from '../../../generated/graphql';
import {
  GetWorkExperienceEntriesComponent,
  refetchGetWorkExperienceEntriesQuery,
  useUpdateWorkExperienceEntryMutation,
} from '../../../generated/graphql';

export const WorkExperience = ({ cvId }: CvEntryComponentProps) => {
  const [updateWorkExperienceEntry] = useUpdateWorkExperienceEntryMutation({
    refetchQueries: [
      refetchGetWorkExperienceEntriesQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (
    id: string,
    fieldName: keyof UpdateWorkExperienceEntryMutationVariables,
    value: string
  ) => {
    await updateWorkExperienceEntry({
      variables: {
        cvId,
        id,
        [fieldName]: value,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateWorkExperience: true,
      },
    });
  };

  return (
    <GetWorkExperienceEntriesComponent fetchPolicy={'cache-first'} variables={{ cvId }}>
      {({ data: { getWorkExperienceEntries: workExperienceEntries } = {}, loading }) =>
        loading || !workExperienceEntries ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom>
              Work Experience
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              {workExperienceEntries.map((job) => (
                <Box key={job.id}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} sm={8}>
                      <EditableTypography
                        id={`job-name-${job.id}`}
                        value={job.name}
                        onSave={(value) => updateField(job.id, 'name', value)}
                        variant="h6"
                      />
                      <EditableTypography
                        id={`job-position-${job.id}`}
                        value={job.position}
                        onSave={(value) => updateField(job.id, 'position', value)}
                        variant="body1"
                      />
                      {job.type && (
                        <EditableTypography
                          id={`job-type-${job.id}`}
                          value={job.type}
                          onSave={(value) => updateField(job.id, 'type', value)}
                          variant="body2"
                          sx={{
                            color: grey[700],
                          }}
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      textAlign="right"
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'end'}
                    >
                      <EditableTypography
                        id={`job-location-${job.id}`}
                        value={job.location}
                        onSave={(value) => updateField(job.id, 'location', value)}
                        variant="body2"
                      />
                      {job.duration && (
                        <EditableTypography
                          id={`job-duration-${job.id}`}
                          value={job.duration}
                          onSave={(value) => updateField(job.id, 'duration', value)}
                          variant="body2"
                        />
                      )}
                    </Grid>
                  </Grid>
                  <EditableTypography
                    id={`job-description-${job.id}`}
                    value={job.description}
                    onSave={(value) => updateField(job.id, 'description', value)}
                    multiline
                  />
                  {job.skills.length > 0 && (
                    //   TODO: come up with a solution of editing arrays like this one.
                    <Typography variant="body2" color={grey[600]}>
                      Skills: {job.skills.join(', ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )
      }
    </GetWorkExperienceEntriesComponent>
  );
};
