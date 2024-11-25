import React from 'react';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';
import type { UpdateEducationEntryMutationVariables } from '../../../generated/graphql';
import {
  GetEducationEntriesComponent,
  refetchGetEducationEntriesQuery,
  useUpdateEducationEntryMutation,
} from '../../../generated/graphql';

export const Education = ({ cvId }: CvEntryComponentProps) => {
  const [updateEducationEntry] = useUpdateEducationEntryMutation({
    refetchQueries: [
      refetchGetEducationEntriesQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (id: string, fieldName: keyof UpdateEducationEntryMutationVariables, value: string) => {
    await updateEducationEntry({
      variables: {
        cvId,
        id,
        [fieldName]: value,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateEducation: true,
      },
    });
  };

  return (
    <GetEducationEntriesComponent fetchPolicy={'cache-first'} variables={{ cvId }}>
      {({ data: { getEducationEntriesByCv: educationEntries } = {}, loading }) =>
        loading || !educationEntries ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box width={'100%'}>
            <Typography variant="h4" gutterBottom>
              Education
            </Typography>
            <Box display="flex" textAlign={'right'} flexDirection="column" gap={2}>
              {educationEntries.map((education) => (
                <Box
                  key={`education-item-${education.id}`}
                  id={`education-item-${education.id}`}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'end'}
                  textAlign={'right'}
                  mb={2}
                >
                  <EditableTypography
                    id={`university-name-${education.id}`}
                    value={education.name}
                    onSave={(value) => updateField(education.id, 'name', value)}
                    variant="h6"
                  />
                  <EditableTypography
                    id={`education-degree-${education.id}`}
                    value={education.degree}
                    onSave={(value) => updateField(education.id, 'degree', value)}
                    variant="body1"
                  />
                  <EditableTypography
                    id={`education-location-${education.id}`}
                    value={education.location}
                    onSave={(value) => updateField(education.id, 'location', value)}
                    variant="body2"
                  />
                  {education.duration && (
                    <EditableTypography
                      id={`education-duration-${education.id}`}
                      value={education.duration}
                      onSave={(value) => updateField(education.id, 'duration', value)}
                      variant="body2"
                    />
                  )}
                  <EditableTypography
                    id={`education-description-${education.id}`}
                    value={education.description}
                    onSave={(value) => updateField(education.id, 'description', value)}
                    multiline
                    sx={{
                      width: '100%',
                    }}
                  />
                  {education.skills && education.skills.length > 0 && (
                    <Typography variant="body2" color={grey[600]}>
                      Skills: {education.skills.join(', ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )
      }
    </GetEducationEntriesComponent>
  );
};
