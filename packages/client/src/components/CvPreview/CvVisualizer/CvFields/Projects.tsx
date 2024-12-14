import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../../../atoms';
import type { CvEntryComponentProps, UpdateItemizedFieldProps } from '../types';
import type { UpdateProjectEntryMutationVariables } from '../../../../generated/graphql';
import { useGetProjectEntriesQuery } from '../../../../generated/graphql';
import {
  refetchGetProjectEntriesQuery,
  useUpdateProjectEntryMutation,
} from '../../../../generated/graphql';
import { grey } from '@mui/material/colors';
import { sortByPosition } from '../../../utils';

export const Projects: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const { data, loading } = useGetProjectEntriesQuery({
    variables: {
      cvId,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummy = data?.getCv?.projectEntries;

  const [projectEntries, setProjectEntries] = useState<
    NonNullable<typeof dummy>
  >([]);

  const [updateProjectEntry] = useUpdateProjectEntryMutation({
    refetchQueries: [
      refetchGetProjectEntriesQuery({
        cvId,
      }),
    ],
  });

  useEffect(() => {
    if (data?.getCv?.projectEntries) {
      setProjectEntries(sortByPosition(data.getCv.projectEntries));
    }
  }, [data]);

  const updateField = async ({
    _id,
    fieldName,
    value,
  }: UpdateItemizedFieldProps<UpdateProjectEntryMutationVariables>) => {
    try {
      await updateProjectEntry({
        variables: {
          cvId,
          _id,
          [fieldName]: value,
        },
      });
    } catch (error) {
      console.error('Error updating project entry:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  if (!projectEntries.length) {
    return <Typography>No projects available.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {projectEntries.map((project) => (
          <Box key={project._id} mb={2}>
            <EditableTypography
              id={`project-name-${project._id}`}
              value={project.name}
              onSave={(value) =>
                updateField({
                  _id: project._id,
                  fieldName: 'name',
                  value,
                })
              }
              variant="h6"
            />
            {project.description && (
              <EditableTypography
                id={`project-description-${project._id}`}
                value={project.description}
                onSave={(value) =>
                  updateField({
                    _id: project._id,
                    fieldName: 'description',
                    value,
                  })
                }
                multiline
              />
            )}
            {!!project.skills?.length && (
              <Typography variant="body2" color={grey[600]}>
                Skills: {project.skills?.join(', ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
