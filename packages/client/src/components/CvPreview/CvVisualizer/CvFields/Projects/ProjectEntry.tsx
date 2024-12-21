import { Box } from '@mui/material';
import { EditableTypography } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';
import {
  DescriptionTextSection,
  SkillsForItemizedEntryEditor,
  WithRemoveEntryButton,
} from '../../../components';
import React from 'react';

export const ProjectEntry = ({
  entry: project,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'projectEntries'>) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <WithRemoveEntryButton removeEntry={removeEntry}>
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
      </WithRemoveEntryButton>

      <DescriptionTextSection
        id={project._id}
        isEditing={isEditing}
        value={project.description}
        onSave={(value) =>
          updateField({
            _id: project._id,
            fieldName: 'description',
            value,
          })
        }
      />

      <SkillsForItemizedEntryEditor
        id={`project-skills-${project._id}`}
        isEditing={isEditing}
        value={project.skills?.length ? project.skills?.join(', ') : undefined}
        onSave={async (value) =>
          updateField({
            _id: project._id,
            fieldName: 'skills',
            value: value.split(',').map((s) => s.trim()),
          })
        }
      />
    </Box>
  );
};
