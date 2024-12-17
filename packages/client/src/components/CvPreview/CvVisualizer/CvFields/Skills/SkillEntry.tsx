import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditableTypography, RemoveEntryButton } from '../../../../atoms';
import type { CvEntryItemProps } from '../../types';

export const SkillEntry = ({
  entry: skill,
  updateField,
  isEditing,
  removeEntry,
}: CvEntryItemProps<'skillEntries'>) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <RemoveEntryButton onClick={removeEntry} />

      <Box flex={1} sx={{ textAlign: 'right' }}>
        <EditableTypography
          id={`skill-category-${skill._id}`}
          value={skill.category}
          onSave={(value) =>
            updateField({
              _id: skill._id,
              fieldName: 'category',
              value,
            })
          }
          variant="h6"
          sx={{
            width: '100%',
          }}
          isEditing={isEditing}
        />

        {skill.items && skill.items.length > 0 && (
          <Typography variant="body2">{skill.items.join(', ')}</Typography>
        )}
      </Box>
    </Box>
  );
};
