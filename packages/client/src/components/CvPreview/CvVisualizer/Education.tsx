// components/Education.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EditableTypography } from '../EditableTypography';
import {
  refetchGetEducationEntriesQuery,
  useGetEducationEntriesQuery,
  useUpdateEducationMutation,
} from '../../../generated/graphql';

type EducationProps = {
  cvId: string;
};

export const Education = ({ cvId }: EducationProps) => {
  const {
    data: { getEducationEntriesByCv: data = undefined } = {},
    loading,
    error,
  } = useGetEducationEntriesQuery({
    variables: {
      cvId,
    },
  });

  const [updateEducation] = useUpdateEducationMutation({
    refetchQueries: [
      refetchGetEducationEntriesQuery({
        cvId,
      }),
    ],
  });

  const handleUpdate = async (id: string, field: string, value: string | string[]) => {
    alert(`Updating Education entry: id: ${id}, cvId: ${cvId}`);
    await updateEducation({
      variables: {
        cvId,
        id,
        description: 'test description',
      },
    });
  };

  if (error) {
    return <Typography>Error</Typography>;
  }
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Education
      </Typography>
      {data.map((education) => (
        <Box key={education.id} mb={2}>
          <EditableTypography
            id={`education-degree-${education.id}`}
            value={education.degree}
            onSave={(value) => handleUpdate(education.id, 'degree', value)}
            variant="h6"
          />
          <EditableTypography
            id={`education-name-${education.id}`}
            value={education.name}
            onSave={(value) => handleUpdate(education.id, 'name', value)}
            variant="h6"
          />
          <EditableTypography
            id={`education-location-${education.id}`}
            value={education.location}
            onSave={(value) => handleUpdate(education.id, 'location', value)}
            variant="body2"
          />
          {education.duration && (
            <EditableTypography
              id={`education-duration-${education.id}`}
              value={education.duration}
              onSave={(value) => handleUpdate(education.id, 'duration', value)}
              variant="body2"
            />
          )}
          <EditableTypography
            id={`education-description-${education.id}`}
            value={education.description}
            onSave={(value) => handleUpdate(education.id, 'description', value)}
            multiline
          />
          {education.skills.length > 0 && (
            <Typography variant="body2" color={grey[600]}>
              Skills: {education.skills.join(', ')}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};
