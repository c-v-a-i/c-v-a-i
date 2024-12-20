import { Box } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import { SkillsForItemizedEntryEditor } from '../../../components';
import React from 'react';

export const ProjectEntry = ({
  entry: project,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'projectEntries'>) => {
  return (
    <Box display={'flex'} gap={1}>
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
        <SkillsForItemizedEntryEditor
          id={`project-skills-${project._id}`}
          isEditing={isEditing}
          value={
            project.skills?.length ? project.skills?.join(', ') : undefined
          }
          onSave={async (value) =>
            updateField({
              _id: project._id,
              fieldName: 'skills',
              value: value.split(',').map((s) => s.trim()),
            })
          }
        />
      </Box>
      <RemoveEntryButton onClick={removeEntry} />
    </Box>
  );
};
