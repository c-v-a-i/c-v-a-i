import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditableTypography } from '../EditableTypography';
import type { CvEntryComponentProps } from './types';
import type { UpdateProjectEntryMutationVariables } from '../../../generated/graphql';
import {
  GetProjectEntriesComponent,
  refetchGetProjectEntriesQuery,
  useUpdateProjectEntryMutation,
} from '../../../generated/graphql';
import { grey } from '@mui/material/colors';

export const Projects: React.FC<CvEntryComponentProps> = ({ cvId }) => {
  const [updateProjectEntry] = useUpdateProjectEntryMutation({
    refetchQueries: [
      refetchGetProjectEntriesQuery({
        cvId,
      }),
    ],
  });

  const updateField = async (
    id: string,
    fieldName: keyof UpdateProjectEntryMutationVariables,
    value: string | string[]
  ) => {
    try {
      await updateProjectEntry({
        variables: {
          cvId,
          id,
          [fieldName]: value,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateProject: true,
        },
      });
    } catch (error) {
      console.error('Error updating project entry:', error);
    }
  };

  // const EditableSkills = ({ project }) => {
  //   const [skills, setSkills] = React.useState(project.skills || []);
  //
  //   const handleAddSkill = (event) => {
  //     if (event.key === 'Enter' && event.target.value) {
  //       const newSkills = [...skills, event.target.value.trim()];
  //       setSkills(newSkills);
  //       updateField(project.id, 'skills', newSkills);
  //       event.target.value = '';
  //     }
  //   };
  //
  //   const handleDeleteSkill = (skillToDelete) => {
  //     const newSkills = skills.filter((skill) => skill !== skillToDelete);
  //     setSkills(newSkills);
  //     updateField(project.id, 'skills', newSkills);
  //   };
  //
  //   return (
  //     <Box mt={1}>
  //       <Box display="flex" flexWrap="wrap" gap={1}>
  //         {skills.map((skill) => (
  //           <Chip key={skill} label={skill} onDelete={() => handleDeleteSkill(skill)} />
  //         ))}
  //       </Box>
  //       <TextField variant="standard" placeholder="Add skill" onKeyDown={handleAddSkill} sx={{ mt: 1 }} />
  //     </Box>
  //   );
  // };

  return (
    <GetProjectEntriesComponent fetchPolicy={'cache-first'} variables={{ cvId }}>
      {({ data: { getProjectEntries: projectEntries } = {}, loading }) =>
        loading || !projectEntries ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom>
              Projects
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {projectEntries.map((project) => (
                <Box key={project.id} mb={2}>
                  <EditableTypography
                    id={`project-name-${project.id}`}
                    value={project.name}
                    onSave={(value) => updateField(project.id, 'name', value)}
                    variant="h6"
                  />
                  <EditableTypography
                    id={`project-description-${project.id}`}
                    value={project.description}
                    onSave={(value) => updateField(project.id, 'description', value)}
                    multiline
                  />
                  {/* <EditableSkills project={project} />*/}
                  {project.skills.length > 0 && (
                    <Typography variant="body2" color={grey[600]}>
                      Skills: {project.skills.join(', ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )
      }
    </GetProjectEntriesComponent>
  );
};
