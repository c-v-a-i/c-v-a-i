import React from 'react';
import { Box } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import { GeneralEducationInformation } from './GeneralEducationInformation';
import type { CvEntryItemProps } from '../../types';
import { SkillsForItemizedEntryEditor } from '../../../components';

export const EducationEntry = ({
  entry: ed,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'educationEntries'>) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={1}>
      <RemoveEntryButton onClick={removeEntry} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        textAlign={'right'}
        flex={1}
      >
        <GeneralEducationInformation
          ed={ed}
          isEditing={isEditing}
          updateField={updateField}
        />

        <EditableTypography
          id={`education-description-${ed._id}`}
          value={ed.description}
          valueRender={(v) => v ?? 'Description (empty)'}
          onSave={(value) =>
            updateField({
              _id: ed._id,
              fieldName: 'description',
              value,
            })
          }
          multiline
          sx={{
            width: '100%',
            textAlign: 'right',
          }}
          isEditing={isEditing}
        />
        <SkillsForItemizedEntryEditor
          id={`education-skills-${ed._id}`}
          isEditing={isEditing}
          value={ed.skills?.length ? ed.skills?.join(', ') : undefined}
          onSave={async (value) =>
            updateField({
              _id: ed._id,
              fieldName: 'skills',
              value: value.split(',').map((s) => s.trim()),
            })
          }
        />
      </Box>
    </Box>
  );
};
