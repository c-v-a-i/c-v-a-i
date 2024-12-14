import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../../../atoms';
import type { CvEntryComponentProps, UpdateItemizedFieldProps } from '../types';
import type { UpdateEducationEntryMutationVariables } from '../../../../generated/graphql';
import {
  useGetEducationEntriesQuery,
  refetchGetEducationEntriesQuery,
  useUpdateEducationEntryMutation,
} from '../../../../generated/graphql';
import { sortByPosition } from '../../../utils';

export const Education: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const { data, loading } = useGetEducationEntriesQuery({
    variables: { cvId },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummy = data?.getCv.educationEntries;

  const [educationEntries, setEducationEntries] = useState<
    NonNullable<typeof dummy>
  >([]);

  const [updateEducationEntry] = useUpdateEducationEntryMutation({
    refetchQueries: [
      refetchGetEducationEntriesQuery({
        cvId,
      }),
    ],
  });

  useEffect(() => {
    setEducationEntries(sortByPosition(data?.getCv?.educationEntries ?? []));
  }, [data]);

  const updateField = async ({
    _id,
    fieldName,
    value,
  }: UpdateItemizedFieldProps<UpdateEducationEntryMutationVariables>) => {
    try {
      await updateEducationEntry({
        variables: {
          cvId,
          _id,
          [fieldName]: value,
        },
      });
    } catch (error) {
      console.error('Error updating education entry:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!educationEntries.length) {
    return <Typography>No education entries available.</Typography>;
  }

  return (
    <Box width={'100%'}>
      <Typography variant="h4" gutterBottom>
        Education
      </Typography>
      <Box display="flex" textAlign={'right'} flexDirection="column" gap={2}>
        {educationEntries.map((education) => (
          <Box
            key={`education-item-${education._id}`}
            id={`education-item-${education._id}`}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'end'}
            textAlign={'right'}
            mb={2}
          >
            <EditableTypography
              id={`university-name-${education._id}`}
              value={education.name}
              onSave={(value) =>
                updateField({ _id: education._id, fieldName: 'name', value })
              }
              variant="h6"
            />
            <EditableTypography
              id={`education-degree-${education._id}`}
              value={education.degree}
              onSave={(value) =>
                updateField({ _id: education._id, fieldName: 'degree', value })
              }
              variant="body1"
            />
            {education.location && (
              <EditableTypography
                id={`education-location-${education._id}`}
                value={education.location}
                onSave={(value) =>
                  updateField({
                    _id: education._id,
                    fieldName: 'location',
                    value,
                  })
                }
                variant="body2"
              />
            )}
            {education.duration && (
              <EditableTypography
                id={`education-duration-${education._id}`}
                value={education.duration}
                onSave={(value) =>
                  updateField({
                    _id: education._id,
                    fieldName: 'duration',
                    value,
                  })
                }
                variant="body2"
              />
            )}
            {education.description && (
              <EditableTypography
                id={`education-description-${education._id}`}
                value={education.description}
                onSave={(value) =>
                  updateField({
                    _id: education._id,
                    fieldName: 'description',
                    value,
                  })
                }
                multiline
                sx={{
                  width: '100%',
                }}
              />
            )}
            {education.skills && education.skills.length > 0 && (
              <Typography variant="body2" color={grey[600]}>
                Skills: {education.skills.join(', ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
