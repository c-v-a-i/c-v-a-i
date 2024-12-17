import { Box, Typography } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';

export const ProjectEntry = ({
  entry: project,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'projectEntries'>) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box flex={1}>
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
          isEditing={isEditing}
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
            isEditing={isEditing}
          />
        )}
        {project.skills && project.skills.length > 0 && (
          <Typography variant="body2">
            Skills: {project.skills.join(', ')}
          </Typography>
        )}
      </Box>
      <RemoveEntryButton onClick={removeEntry} />
    </Box>
  );
};
