import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import type { GetCvInformationQuery } from '../../../generated/graphql';
import { EditableTypography } from '../EditableTypography';

type ProjectsProps = {
  data: GetCvInformationQuery['getCv']['projectEntries'];
};

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  // const [updateProject] = useUpdateProjectMutation();

  const handleUpdate = async (id: string, field: string, value: string | string[]) => {
    // const input: UpdateProjectInput = { id, [field]: value };
    // await updateProject({ variables: { input } });
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      {data.map((project) => (
        <Box key={project.id} mb={2}>
          <EditableTypography
            id={`project-name-${project.id}`}
            value={project.name}
            onSave={(value) => handleUpdate(project.id, 'name', value)}
            variant="h6"
          />
          <EditableTypography
            id={`project-description-${project.id}`}
            value={project.description}
            onSave={(value) => handleUpdate(project.id, 'description', value)}
            multiline
          />
          {project.skills.length > 0 && (
            <Typography variant="body2" color={grey[600]}>
              Skills: {project.skills.join(', ')}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};
